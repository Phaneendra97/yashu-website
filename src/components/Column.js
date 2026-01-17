import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { Card } from './Card';
import './Column.css';

export const Column = ({ column, cards, onViewDetails }) => {
  return (
    <div className="column-container">
      <div className="column-header">
        <span className="column-header-text">
          {column.title}
          <span className="column-count">{cards.length}</span>
        </span>
      </div>
      <Droppable droppableId={column.id} type="card">
        {(provided, snapshot) => (
          <div
            className={`card-list ${snapshot.isDraggingOver ? 'is-dragging-over' : ''}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {cards.map((card, index) => (
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
