import React from 'react';
import { Mail, Linkedin, Github } from 'lucide-react';
import './Header.css';

export const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-title">
          <h1>Yashaswini Mohan</h1>
          <p className="header-subtitle">Project Manager & Software Engineer</p>
        </div>
        <div className="header-contact">
          <a href="mailto:yashaswini.phani@gmail.com" className="contact-link">
            <Mail size={20} />
            <span>Email</span>
          </a>
          <a href="https://linkedin.com/in/yashaswinimohan" target="_blank" rel="noopener noreferrer" className="contact-link">
            <Linkedin size={20} />
            <span>LinkedIn</span>
          </a>
        </div>
      </div>
      <div className="header-description">
        <p>Welcome to my interactive portfolio! This Kanban board showcases my professional background organized by key areas. Drag and drop cards to explore my skills, education, experience, and certifications. This presentation demonstrates my project management expertise and attention to detail.</p>
      </div>
    </header>
  );
};
