const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { OpenAI } = require("openai");

const NodeCache = require("node-cache");
const { systemPrompt } = require('./prompts');

admin.initializeApp();

// Initialize Cache (TTL: 1 hour = 3600 seconds)
const cache = new NodeCache({ stdTTL: 3600 });
const rateLimitCache = new NodeCache({ stdTTL: 900 }); // 15 minutes window

// Initialize OpenAI
// Note: Ensure OPENAI_API_KEY is set in your environment variables
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || "dummy-key-for-build",
});

// Allow only the specific domain
const cors = require("cors")({ origin: ["https://yashu-website.web.app", "http://localhost:3000"] });

exports.chatQuery = functions.runWith({ secrets: ["OPENAI_API_KEY"] }).https.onRequest((req, res) => {
    cors(req, res, async () => {
        // --- Rate Limiting Strategy ---
        // Identify user by "x-forwarded-for" (standard in Firebase Functions) or socket IP
        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        const rateKey = `ratelimit_${ip}`;
        const currentUsage = rateLimitCache.get(rateKey) || 0;

        // Limit: 20 requests per 15 minutes per IP
        if (currentUsage >= 20) {
            return res.status(429).send({ error: 'Too many requests. Please try again later.' });
        }
        rateLimitCache.set(rateKey, currentUsage + 1);
        try {
            if (req.method !== 'POST') {
                return res.status(405).send('Method Not Allowed');
            }

            const { message, history } = req.body;

            if (!message) {
                return res.status(400).send({ error: 'Message is required' });
            }

            // --- Caching Logic (Simplified for single-turn, might need adjustment for multi-turn) ---
            // For multi-turn, we might want to cache based on the LAST message if context is minimal,
            // OR skip caching for complex multi-turn. For now, we'll keep simple caching for FAQ-like queries.
            // If history is long, caching single queries is less effective.
            const normalizedKey = `v2_${message.trim().toLowerCase()}`;
            // Only cache if history is empty (first turn), otherwise we need fresh context
            /* 
               COMMENTING OUT CACHE FOR CONTEXTUAL CHAT
               To enable true "conversation", we should bypass cache when history exists, 
               or use a hash of the entire history as the key.
               For this fix, let's bypass cache if history > 0 to ensure the AI sees the context.
            */
            if ((!history || history.length === 0)) {
                const cachedResponse = cache.get(normalizedKey);
                if (cachedResponse) {
                    console.log("Cache Hit for:", normalizedKey);
                    return res.status(200).send(cachedResponse);
                }
            }

            console.log("Calling OpenAI for:", message);

            // Convert frontend history to OpenAI format
            // Frontend: { type: 'user'|'bot', content: '...' }
            // OpenAI: { role: 'user'|'assistant', content: '...' }
            // Take last 6 messages to save context window/tokens
            const contextMessages = (history || []).slice(-6).map(msg => ({
                role: msg.type === 'user' ? 'user' : 'assistant',
                content: msg.content
            })); // Note: 'bot' -> 'assistant'

            const completion = await openai.chat.completions.create({
                model: "gpt-4o-mini",
                messages: [
                    {
                        role: "system",
                        content: systemPrompt
                    },
                    ...contextMessages,
                    {
                        role: "user",
                        content: message
                    }
                ],
                functions: [
                    {
                        name: "candidate_website_response",
                        description: "Determine the response type and content for the candidate website.",
                        parameters: {
                            type: "object",
                            properties: {
                                type: {
                                    type: "string",
                                    description: "Type of the response format.",
                                    enum: ["standard", "non_standard"]
                                },
                                response: {
                                    description: "The response content",
                                    anyOf: [
                                        {
                                            type: "string",
                                            description: "One of the standard enum values for basic sections or actions.",
                                            enum: ["skills", "experience", "education", "contact", "no_answer", "lockdown"]
                                        },
                                        {
                                            type: "string",
                                            description: "A non-standard, highly positive free-form text response.",
                                            minLength: 1
                                        }
                                    ]
                                },
                                explanation: {
                                    type: "string",
                                    description: "Mandatory for 'education' and 'experience' responses. Provide a persuasive summary explaining how the section relates to the user's goals (specifically Project Management). Optional for other types."
                                }
                            },
                            required: ["type", "response"],
                            additionalProperties: false
                        }
                    }
                ],
                function_call: { name: "candidate_website_response" }
            });

            const functionArgs = JSON.parse(completion.choices[0].message.function_call.arguments);

            console.log("OpenAI Response:", functionArgs);

            // Store in cache
            cache.set(normalizedKey, functionArgs);

            res.status(200).send(functionArgs);

        } catch (error) {
            console.error("Error calling OpenAI:", error);
            res.status(500).send({ error: error.message });
        }
    });
});
