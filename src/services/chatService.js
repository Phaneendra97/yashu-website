// Basic service to call the Firebase Cloud Function
// In production, this URL should be the deployed function URL
// In development, it might be localhost:5001 if using emulators

const getFunctionUrl = () => {
    if (window.location.hostname === 'localhost') {
        // Assuming default firebase emulator port
        // You might need to adjust the project ID 'yashu-website' if it's different in .firebaserc
        return 'http://localhost:5001/yashu-website/us-central1/chatQuery';
    }
    // For production (or when served via firebase hosting), use the relative path
    // tailored to the rewrite rule in firebase.json
    return '/chatQuery';
};

export const fetchChatResponse = async (message, history = []) => {
    const url = getFunctionUrl();

    // In production, DO NOT use mock fallback so we can see real errors
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message, history }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Server Error (${response.status}): ${errorText}`);
        }

        return await response.json();
    } catch (error) {
        // Log it but don't swallow it completely if we want to debug
        console.error("API Error:", error);
        throw error;
    }
};

// Fallback mock logic for testing UI without backend
const mockResponse = (message) => {
    const msg = message.toLowerCase();

    // Simulate network delay
    return new Promise(resolve => {
        setTimeout(() => {
            // DETECT COMPLEX QUERY / JOB DESCRIPTION
            // If the message is long (likely a job description) or asks for a match
            if (message.length > 50 || msg.includes('match') || msg.includes('fit') || msg.includes('role')) {
                resolve({
                    type: 'non_standard',
                    response: `This is a great match! \n\nBased on the job description, Yashaswini is a strong candidate:\n- **Agile & Jira**: She has 3.5 years of experience using these tools to manage sprint lifecycles.\n- **Stakeholder Management**: Proven ability to coordinate with cross-functional teams and faculty.\n- **Technical Background**: Her CS degree and engineering experience allow her to bridge the gap between technical and business requirements.\n\nTo discuss this opportunity further, please connect with Yashaswini at: yashaswini.m@sjsu.edu | +1 408-210-8800 | linkedin.com/in/yashaswinimohan`
                });
                return;
            }

            if (msg.includes('skill')) {
                resolve({
                    type: 'standard',
                    response: 'skills'
                });
            } else if (msg.includes('experience') || msg.includes('work')) {
                resolve({
                    type: 'standard',
                    response: 'experience'
                });
            } else if (msg.includes('education')) {
                resolve({
                    type: 'standard',
                    response: 'education'
                });
            } else if (msg.includes('summary') || msg.includes('about') || msg.includes('bio')) {
                resolve({
                    type: 'non_standard',
                    response: "Yashaswini Mohan is an Engineering Management graduate student at San José State University..."
                });
            } else {
                resolve({
                    type: 'non_standard',
                    response: "I can help you explore Yashu's background. Try asking about her skills, experience, or education!"
                });
            }
        }, 1000);
    });
};
