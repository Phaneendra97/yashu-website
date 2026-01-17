import React from 'react';
import './Header.css';
import { Search, User, Bell, HelpCircle } from 'lucide-react';

export const Header = () => {
  return (
    <header className="jira-header">
      <div className="header-left">
        <nav className="breadcrumbs">
          <span className="breadcrumb-item">Projects</span>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-item">Yashaswini Mohan</span>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-item active">Kanban Board</span>
        </nav>
        <h1 className="board-title">KAN Kanban board</h1>
      </div>

      <div className="header-right">
        <div className="header-search">
          <Search size={16} />
          <input type="text" placeholder="Search this board" />
        </div>
        <div className="header-avatars">
          <span className="avatar-circle">YM</span>
          <span className="add-user-btn">+</span>
        </div>
      </div>
    </header>
  );
};
