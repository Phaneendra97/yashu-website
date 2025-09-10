import React from 'react';
import { Column } from './Column';
import './KanbanBoard.css';

export const KanbanBoard = ({ columns, onViewDetails }) => {
  const columnOrder = ['skills', 'education', 'experience', 'certifications'];

  return (
    <div className="kanban-board">
      {columnOrder.map(columnId => {
        const column = columns[columnId];
        return (
          <Column
            key={column.id}
            column={column}
            onViewDetails={onViewDetails}
          />
        );
      })}
    </div>
  );
};
