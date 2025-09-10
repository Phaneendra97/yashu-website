import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Mail, Linkedin, Calendar, MapPin, Award, Code, GraduationCap, Wrench, Clock, AlertCircle, CheckCircle, Loader, Eye } from 'lucide-react';
import './Card.css';

const getCardIcon = (type) => {
  switch (type) {
    case 'experience':
      return <Calendar size={16} />;
    case 'certification':
      return <Award size={16} />;
    case 'education':
      return <GraduationCap size={16} />;
    case 'skills':
      return <Wrench size={16} />;
    default:
      return <MapPin size={16} />;
  }
};

export const Card = ({ card, index, onViewDetails }) => {
  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`card ${snapshot.isDragging ? 'dragging' : ''} ${card.type} ${card.status ? `status-${card.status}` : ''}`}
        >
          <div className="card-header">
            <div className="card-icon">
              {getCardIcon(card.type)}
            </div>
            <h4 className="card-title">{card.title}</h4>
            {card.status === 'in-progress' && (
              <div className="status-indicator">
                <Loader size={14} className="spinning" />
                <span>In Progress</span>
              </div>
            )}
            {card.status === 'completed' && (
              <div className="status-indicator completed">
                <CheckCircle size={14} />
                <span>Completed</span>
              </div>
            )}
          </div>
          
          <div className="card-content">
            <p className="card-description">{card.content}</p>
            
            {card.email && (
              <div className="card-contact">
                <a href={`mailto:${card.email}`} className="contact-email">
                  <Mail size={14} />
                  {card.email}
                </a>
                <a href={`https://${card.linkedin}`} target="_blank" rel="noopener noreferrer" className="contact-linkedin">
                  <Linkedin size={14} />
                  LinkedIn
                </a>
              </div>
            )}
            
            {card.details && (
              <ul className="card-details">
                {card.details.map((detail, idx) => (
                  <li key={idx} className="detail-item">
                    {detail}
                  </li>
                ))}
              </ul>
            )}
          </div>
          
          <div className="card-footer">
            {card.type === 'education' ? (
              <div className="date-chips">
                {card.id === 'masters-em' && (
                  <span className="date-chip">Jan 2025 - Jun 2026</span>
                )}
                {card.id === 'masters-cs' && (
                  <span className="date-chip">Jan 2022 - Jun 2023</span>
                )}
                {card.id === 'bachelors-cs' && (
                  <span className="date-chip">Aug 2015 - Jul 2019</span>
                )}
              </div>
            ) : (
              <span className="card-type">{card.type}</span>
            )}
            <button 
              className="view-details-btn"
              onClick={(e) => {
                e.stopPropagation();
                onViewDetails(card);
              }}
              title="View Details"
            >
              <Eye size={16} />
            </button>
          </div>
        </div>
      )}
    </Draggable>
  );
};
