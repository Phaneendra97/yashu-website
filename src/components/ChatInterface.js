import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { GanttView } from './GanttView';
import { KanbanBoard } from './KanbanBoard';
import { fetchChatResponse } from '../services/chatService';
import { tasks, skillsColumns } from '../data/portfolioData';
import './ChatInterface.css';

const MessageBubble = ({ message }) => {
    const isBot = message.type === 'bot';

    const formatMessage = (text) => {
        if (!text) return null;

        // Helper to linkify text
        const linkify = (inputText) => {
            // URL regex (http/https/www)
            const urlRegex = /(https?:\/\/[^\s]+|www\.[^\s]+)/g;
            // Email regex
            const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/g;
            // Phone regex (simple US format matching the specific one used)
            const phoneRegex = /(\+1\s\d{3}-\d{3}-\d{4})/g;

            // Split by URL, Email, or Phone
            const parts = inputText.split(/((?:https?:\/\/[^\s]+|www\.[^\s]+)|(?:[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)|(?:\+1\s\d{3}-\d{3}-\d{4}))/g);

            return parts.map((part, i) => {
                if (part.match(urlRegex)) {
                    const href = part.startsWith('www.') ? `http://${part}` : part;
                    return <a key={i} href={href} target="_blank" rel="noopener noreferrer" style={{ color: '#2563EB', textDecoration: 'underline' }}>{part}</a>;
                }
                if (part.match(emailRegex)) {
                    return <a key={i} href={`mailto:${part}`} style={{ color: '#2563EB', textDecoration: 'underline' }}>{part}</a>;
                }
                if (part.match(phoneRegex)) {
                    return <a key={i} href={`tel:${part.replace(/\s/g, '')}`} style={{ color: '#2563EB', textDecoration: 'underline' }}>{part}</a>;
                }
                return part;
            });
        };

        // Split by newlines first to handle line breaks
        return text.split('\n').map((line, lineIdx) => {
            // Include a break for subsequent lines
            const lineContent = line.split(/(\*\*.*?\*\*)/g).map((part, partIdx) => {
                if (part.startsWith('**') && part.endsWith('**')) {
                    return <strong key={partIdx}>{part.slice(2, -2)}</strong>;
                }
                // Linkify non-bold parts
                return <span key={partIdx}>{linkify(part)}</span>;
            });

            return (
                <span key={lineIdx}>
                    {lineContent}
                    {lineIdx < text.split('\n').length - 1 && <br />}
                </span>
            );
        });
    };

    return (
        <div className={`message-bubble ${message.type}`}>
            {isBot && message.content ? (
                <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                    <div className="bot-avatar">AI</div>
                    <div>{formatMessage(message.content)}</div>
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
