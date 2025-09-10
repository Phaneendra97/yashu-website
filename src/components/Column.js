import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { Card } from './Card';
import './Column.css';

export const Column = ({ column, onViewDetails }) => {
  return (
    <div className="column">
      <div className="column-header" style={{ borderTopColor: column.color }}>
        <h3 className="column-title">{column.title}</h3>
        <span className="card-count" style={{ backgroundColor: column.color }}>{column.cards.length}</span>
      </div>
      
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`column-content ${snapshot.isDraggingOver ? 'dragging-over' : ''}`}
          >
            {column.cards.map((card, index) => (
              <Card
                key={card.id}
                card={card}
                index={index}
                onViewDetails={onViewDetails}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};
