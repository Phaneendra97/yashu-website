import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import './Card.css';

export const Card = ({ card, index, onViewDetails }) => {



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
          {card.subtitle && <div className="card-subtitle" style={{ fontSize: '13px', fontWeight: '500', color: '#42526E', marginTop: '4px' }}>{card.subtitle}</div>}
          {card.time && (
            <div className="card-time" style={{
              display: 'inline-block',
              alignSelf: 'flex-start', // Prevent stretching
              fontSize: '11px',
              color: '#0052CC',
              marginTop: '8px',
              backgroundColor: '#DEEBFF',
              padding: '2px 8px',
              borderRadius: '12px',
              fontWeight: '500',
              whiteSpace: 'normal',
              lineHeight: '1.5'
            }}>
              {card.time}
            </div>
          )}
          {card.details && <div className="card-details" style={{ fontSize: '12px', color: '#5E6C84', marginTop: '8px' }}>{card.details}</div>}


        </div>
      )}
    </Draggable>
  );
};
