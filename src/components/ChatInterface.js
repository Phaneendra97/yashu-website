import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { GanttView } from './GanttView';
import { KanbanBoard } from './KanbanBoard';
import { fetchChatResponse } from '../services/chatService';
import { tasks, skillsColumns } from '../data/portfolioData';
import './ChatInterface.css';

import ReactMarkdown from 'react-markdown';

const MessageBubble = ({ message }) => {
    const isBot = message.type === 'bot';

    return (
        <div className={`message-bubble ${message.type}`}>
            {isBot && message.content ? (
                <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                    <div className="bot-avatar">AI</div>
                    <div className="markdown-content">
                        <ReactMarkdown
                            components={{
                                a: ({ node, ...props }) => (
                                    <a {...props} target="_blank" rel="noopener noreferrer" style={{ color: '#2563EB', textDecoration: 'underline' }} />
                                )
                            }}
                        >
                            {message.content}
                        </ReactMarkdown>
                    </div>
                </div>
            ) : (
                message.content
            )}
        </div>
    );
};

const WidgetRenderer = ({ widgetType }) => {
    // Filter tasks for Gantt charts
    const educationTasks = tasks.filter(t => t.project === 'Education');
    const experienceTasks = tasks.filter(t => t.project === 'Experience');

    switch (widgetType) {
        case 'skills':
            return (
                <div className="widget-container">
                    <h3 style={{ padding: '0 20px', color: '#172B4D' }}>Skills & Expertise</h3>
                    <KanbanBoard columns={skillsColumns} onViewDetails={() => { }} />
                </div>
            );
        case 'experience':
            return (
                <div className="widget-container">
                    <h3 style={{ padding: '0 20px', color: '#172B4D' }}>Work Experience</h3>
                    <div style={{ overflowX: 'auto' }}>
                        <GanttView tasks={experienceTasks} />
                    </div>
                </div>
            );
        case 'education':
            return (
                <div className="widget-container">
                    <h3 style={{ padding: '0 20px', color: '#172B4D' }}>Education Timeline</h3>
                    <div style={{ overflowX: 'auto' }}>
                        <GanttView tasks={educationTasks} />
                    </div>
                </div>
            );
        default:
            return null;
    }
};

export const ChatInterface = () => {
    const [history, setHistory] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const chatEndRef = useRef(null);
    const textareaRef = useRef(null);

    const chips = [
        { id: 'education', label: 'Education', icon: '🎓' },
        { id: 'skills', label: 'Skills', icon: '⚡' },
        { id: 'projects', label: 'Projects', icon: '🚀' },
        { id: 'experience', label: 'Experience', icon: '💼' }
    ];

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [history, isLoading]);

    const handleChipClick = (chip) => {
        // Treat chip click exactly like typing the query to trigger the AI response
        handleSend(chip.label);
    };

    // Static content for Experience to avoid API call
    const STATIC_EXPERIENCE_CONTENT = `**Project & Product Management professional** with **3.5+ years of experience** driving execution in product-led, Agile environments. Served as a **Scrum Master** and delivery lead at **Wabtec**, owning sprint planning, backlog prioritization, cross-functional coordination, and release execution for user-facing features. Currently an **Associate Product Manager**, owning MVP definition, roadmapping, stakeholder alignment, and pilot launch for an AI education platform. Strong in **data-driven decision-making**, KPI tracking, rapid experimentation, and translating user needs into scalable product solutions.

**Associate Product Manager — AI Academy, San José State University**
*Sept 2025 – Present*

*   **Product Ownership & PLG Execution**: Own the end-to-end product lifecycle for the AI Academy platform, from product vision and MVP scoping to pilot launch and iteration. Define and prioritize the product roadmap (course catalog, student dashboard, analytics) based on user needs, engagement goals, and stakeholder input. Drive PLG principles by focusing on self-serve onboarding, user adoption, and engagement metrics for the pilot cohort.
*   **Agile Delivery & Stakeholder Management**: Lead Agile sprint execution across multiple teams, managing backlog prioritization, sprint planning, retrospectives, and delivery tracking. Translate academic and business objectives into clear product requirements and acceptance criteria. Align faculty, designers, and developers around timelines, scope, and launch readiness.
*   **Metrics & Launch Readiness**: Define KPIs for adoption, engagement, and course completion to guide post-launch optimization. Prepare go-to-market and pilot launch strategy, targeting measurable student engagement outcomes.

**Software Engineer (Scrum Master / Delivery Lead) — Wabtec Inc.**
*Jul 2022 – Dec 2024*

*   **Project & Delivery Management (Beyond Engineering Scope)**: Functioned as **Scrum Master** and delivery owner in addition to engineering responsibilities, facilitating daily stand-ups, sprint planning, backlog grooming, and retrospectives. Owned delivery timelines, sprint commitments, and release coordination across engineering and QA teams in a regulated enterprise environment. Actively tracked risks, dependencies, scope changes, and delivery metrics to improve predictability and on-time delivery.
*   **Cross-Functional & Stakeholder Coordination**: Served as the primary liaison between engineering, QA, and leadership, ensuring alignment on priorities, quality standards, and delivery expectations. Translated technical work into clear status updates and stakeholder reports, enabling informed decision-making.
*   **Process Optimization & Impact**: Introduced testing and process improvements that reduced regression cycles by **15%** and accelerated feature rollout. Mentored junior engineers while balancing execution speed with delivery quality, reinforcing Agile best practices.

**Intern (Project Analytics & PM Support) — Wabtec Inc.**
*Aug 2021 – Aug 2022*

*   **Data-Driven Project Management**: Built and deployed **Power BI dashboards** to track project efficiency, utilization, and delivery trends across **15+ projects**. Enabled leadership to make data-backed prioritization decisions, improving resource allocation by **10%**.
*   **Operational & Process Excellence**: Automated reporting workflows, reducing manual effort by **80%** and improving visibility into ongoing initiatives. Supported portfolio-level analysis, surfacing insights that contributed to **~$200K** in annual cost savings.`;

    const handleSend = async (text) => {
        if (!text.trim()) return;

        // Add user message
        const userMsg = { type: 'user', content: text };
        setHistory(prev => [...prev, userMsg]);
        setInputValue('');
        setIsLoading(true);

        // Reset textarea height
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
        }

        // Intercept "Experience" query for static response
        if (text.trim().toLowerCase() === 'experience') {
            setTimeout(() => {
                const botMsg = {
                    type: 'bot',
                    content: STATIC_EXPERIENCE_CONTENT,
                    widget: 'experience'
                };
                setHistory(prev => [...prev, botMsg]);
                setIsLoading(false);
            }, 600); // Small natural delay
            return;
        }

        try {
            // Pass history along with the new message
            const data = await fetchChatResponse(text, history);

            let botMsg = { type: 'bot', content: '', widget: null };

            if (data.type === 'standard') {
                botMsg.widget = data.response; // 'skills', 'experience', 'education'

                // Use the AI-provided explanation if available, otherwise fallback to static text
                if (data.explanation) {
                    botMsg.content = data.explanation;
                } else {
                    const introTexts = {
                        skills: "Here's an overview of Yashu's technical and product skills.",
                        experience: "Here is Yashu's professional experience timeline.",
                        education: "Here are the details of Yashu's educational background."
                    };
                    botMsg.content = introTexts[data.response] || "Here is the information you requested.";
                }

            } else if (data.type === 'non_standard') {
                botMsg.content = data.response;
            }

            setHistory(prev => [...prev, botMsg]);
        } catch (error) {
            setHistory(prev => [...prev, { type: 'bot', content: "Sorry, I'm having trouble connecting right now." }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend(inputValue);
        }
    };

    const handleInput = (e) => {
        setInputValue(e.target.value);
        e.target.style.height = 'auto';
        e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
    };

    return (
        <div className={`chat-container ${history.length > 0 ? 'has-history' : 'initial-state'}`}>

            {history.length === 0 && (
                <h1 className="chat-welcome-text">
                    Hi, I'm Yashaswini Mohan.
                </h1>
            )}

            <div className="chat-content-wrapper">
                {history.map((msg, idx) => (
                    <React.Fragment key={idx}>
                        <MessageBubble message={msg} />
                        {msg.widget && <WidgetRenderer widgetType={msg.widget} />}
                    </React.Fragment>
                ))}

                {isLoading && (
                    <div className="typing-indicator">
                        <div className="typing-dot"></div>
                        <div className="typing-dot"></div>
                        <div className="typing-dot"></div>
                    </div>
                )}
                <div ref={chatEndRef} />
            </div>

            <div className="input-area">
                <div className="chat-chips-container">
                    {chips.map((chip) => (
                        <button
                            key={chip.id}
                            className="chat-chip"
                            onClick={() => handleChipClick(chip)}
                        >
                            <span>{chip.icon}</span>
                            {chip.label}
                        </button>
                    ))}
                </div>

                <div className="chat-search-container">
                    <textarea
                        ref={textareaRef}
                        className="chat-search-input"
                        placeholder="Get to know me..."
                        value={inputValue}
                        onChange={handleInput}
                        onKeyDown={handleKeyDown}
                        rows={1}
                    />
                    <button
                        className="chat-send-button"
                        onClick={() => handleSend(inputValue)}
                        disabled={!inputValue.trim() || isLoading}
                    >
                        <Send size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};
