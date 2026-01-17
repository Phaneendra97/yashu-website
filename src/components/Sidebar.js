import React from 'react';
import './Sidebar.css';
import { Layout, CheckSquare, Settings, Plus, Search, Bell, HelpCircle } from 'lucide-react';

export const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-top">
        <div className="sidebar-header">
          <div className="project-icon">
            <span role="img" aria-label="project">🚀</span>
          </div>
          <div className="project-info">
            <div className="project-name">Yashaswini Mohan</div>
            <div className="project-category">Software Project</div>
          </div>
        </div>
        
        <nav className="sidebar-nav">
          <div className="nav-item active">
            <Layout size={20} />
            <span>Board</span>
          </div>
          <div className="nav-item">
            <CheckSquare size={20} />
            <span>Backlog</span>
          </div>
          <div className="nav-item">
            <Settings size={20} />
            <span>Project settings</span>
          </div>
        </nav>
      </div>

      <div className="sidebar-bottom">
        <div className="nav-item">
          <span>You have one project</span>
        </div>
      </div>
    </div>
  );
};
