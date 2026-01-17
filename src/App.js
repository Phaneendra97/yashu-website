import React, { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { KanbanBoard } from './components/KanbanBoard';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Modal } from './components/Modal';
import './App.css';

function App() {
  const [selectedCard, setSelectedCard] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Jira-style Project Data
  const [columns, setColumns] = useState({
    'todo': {
      id: 'todo',
      title: 'TO DO',
      cards: [
        {
          id: 'edu-1',
          key: 'EDU-1',
          title: 'Complete Master\'s in Engineering Management',
          type: 'story',
          priority: 'high',
          content: 'San Jose State University',
          assignee: 'YM'
        },
        {
          id: 'cert-1',
          key: 'CERT-1',
          title: 'Google Project Management Certification',
          type: 'task',
          priority: 'medium',
          content: 'In Progress - 2025',
          assignee: 'YM'
        }
      ]
    },
    'in-progress': {
      id: 'in-progress',
      title: 'IN PROGRESS',
      cards: [
        {
          id: 'exp-1',
          key: 'EXP-1',
          title: 'Software Engineer at Wabtec Inc',
          type: 'bug', // Using bug icon for variety or maybe story
          priority: 'highest',
          content: 'Driving API development and testing strategies.',
          assignee: 'YM'
        },
        {
          id: 'skill-1',
          key: 'SKILL-1',
          title: 'Agile Facilitation & Coaching',
          type: 'story',
          priority: 'high',
          content: 'Leading scrum ceremonies and backlog refinement.',
          assignee: 'YM'
        }
      ]
    },
    'done': {
      id: 'done',
      title: 'DONE',
      cards: [
        {
          id: 'edu-2',
          key: 'EDU-2',
          title: 'Master\'s in Computer Science',
          type: 'story',
          priority: 'low',
          content: 'RV Institute of Technology - Completed',
          assignee: 'YM'
        },
        {
          id: 'exp-2',
          key: 'EXP-2',
          title: 'Software Engineering Intern',
          type: 'task',
          priority: 'medium',
          content: 'Wabtec Inc - Sep 2021 to Jun 2022',
          assignee: 'YM'
        },
        {
          id: 'cert-2',
          key: 'CERT-2',
          title: 'Certified ScrumMaster (CSM)',
          type: 'task',
          priority: 'medium',
          content: 'Scrum Framework & Agile Leadership',
          assignee: 'YM'
        }
      ]
    }
  });

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = columns[source.droppableId];
    const finish = columns[destination.droppableId];

    if (start === finish) {
      const newCardIds = Array.from(start.cards);
      const [movedCard] = newCardIds.splice(source.index, 1);
      newCardIds.splice(destination.index, 0, movedCard);

      const newColumn = {
        ...start,
        cards: newCardIds,
      };

      const newColumns = {
        ...columns,
        [newColumn.id]: newColumn,
      };

      setColumns(newColumns);
      return;
    }

    // Moving from one list to another
    const startCardIds = Array.from(start.cards);
    const [movedCard] = startCardIds.splice(source.index, 1);
    const newStart = {
      ...start,
      cards: startCardIds,
    };

    const finishCardIds = Array.from(finish.cards);
    finishCardIds.splice(destination.index, 0, movedCard);
    const newFinish = {
      ...finish,
      cards: finishCardIds,
    };

    const newColumns = {
      ...columns,
      [newStart.id]: newStart,
      [newFinish.id]: newFinish,
    };

    setColumns(newColumns);
  };

  const handleViewDetails = (card) => {
    setSelectedCard(card);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCard(null);
  };

  return (
    <div className="App">
      <Sidebar />
      <div className="main-content">
        <Header />
        <DragDropContext onDragEnd={onDragEnd}>
          <KanbanBoard columns={columns} onViewDetails={handleViewDetails} />
        </DragDropContext>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        card={selectedCard}
      />
    </div>
  );
}

export default App;
