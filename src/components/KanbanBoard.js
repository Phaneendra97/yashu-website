import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { Column } from './Column';
import './KanbanBoard.css';

export const KanbanBoard = ({ columns, onViewDetails }) => {
  const onDragEnd = (result) => {
    // TODO: Reorder logic
    console.log(result);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
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
    </DragDropContext>
  );
};
