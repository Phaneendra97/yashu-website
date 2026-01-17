import React from 'react';
import { Column } from './Column';
import './KanbanBoard.css';

export const KanbanBoard = ({ columns, onViewDetails }) => {
  return (
    <div className="kanban-board">
      {Object.values(columns).map((column, index) => (
        <Column
          key={column.id}
          column={column}
          cards={column.cards}
          onViewDetails={onViewDetails}
          index={index}
        />
      ))}
    </div>
  );
};
