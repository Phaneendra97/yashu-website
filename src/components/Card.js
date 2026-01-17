import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { CheckSquare, Bookmark, AlertCircle, ArrowUp, ArrowDown, Minus } from 'lucide-react';
import './Card.css';

export const Card = ({ card, index, onViewDetails }) => {

  const getIcon = (type) => {
    switch (type) {
      case 'story': return <div className="jira-icon icon-story"><Bookmark size={10} fill="white" /></div>;
      case 'bug': return <div className="jira-icon icon-bug"><AlertCircle size={10} /></div>;
      case 'task': default: return <div className="jira-icon icon-task"><CheckSquare size={10} /></div>;
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'highest': return <ArrowUp size={12} color="#FF5630" strokeWidth={3} />;
      case 'high': return <ArrowUp size={12} color="#FF5630" />;
      case 'medium': return <ArrowUp size={12} color="#FFAB00" />;
      case 'low': return <ArrowDown size={12} color="#0065FF" />;
      default: return <Minus size={12} color="#97A0AF" />;
    }
  };

  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided, snapshot) => (
        <div
          className={`card-container ${snapshot.isDragging ? 'is-dragging' : ''}`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onClick={() => onViewDetails(card)}
        >
          <div className="card-title">{card.title}</div>

          <div className="card-footer">
            <div className="card-type-icon">
              {getIcon(card.type)}
              <span className="issue-key">{card.key}</span>
            </div>

            <div className="footer-right">
              {getPriorityIcon(card.priority)}
              <div className="assignee-avatar">{card.assignee}</div>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};
