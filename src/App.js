import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { KanbanBoard } from './components/KanbanBoard';
import { Header } from './components/Header';
import { Modal } from './components/Modal';
import './App.css';

function App() {
  const [selectedCard, setSelectedCard] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [columns, setColumns] = useState({
    'skills': {
      id: 'skills',
      title: '🛠️ Skills',
      color: '#667eea',
      cards: [
        {
          id: 'pm-skills',
          title: 'Project Management',
          content: 'Agile (Scrum, Kanban), Waterfall, Project Planning & Execution, Risk Management, Requirements Gathering, Release Management, Process Improvement (Six Sigma)',
          type: 'skills'
        },
        {
          id: 'tech-leadership',
          title: 'Technical Leadership',
          content: 'Software Development Lifecycle (SDLC) expertise, Technical Troubleshooting, API Integration, Quality Assurance',
          type: 'skills'
        },
        {
          id: 'agile-facilitation',
          title: 'Agile Facilitation',
          content: 'Leading Scrum ceremonies, Backlog Refinement, Impediment Removal, Coaching Development Teams',
          type: 'skills'
        },
        {
          id: 'stakeholder-mgmt',
          title: 'Stakeholder Management',
          content: 'Cross-functional communication, Expectation Management, Building strong relationships with technical and business teams',
          type: 'skills'
        },
        {
          id: 'tools',
          title: 'Tools & Technologies',
          content: 'Jira, Confluence, Microsoft Project, Monday.com, Git, PowerBI, Tableau, Django, React, Wireshark',
          type: 'skills'
        },
        {
          id: 'soft-skills',
          title: 'Soft Skills',
          content: 'Leadership, Problem-Solving, Strategic Thinking, Verbal & Written Communication',
          type: 'skills'
        }
      ]
    },
    'education': {
      id: 'education',
      title: '🎓 Education',
      color: '#48bb78',
      cards: [
        {
          id: 'masters-em',
          title: 'Master\'s in Engineering Management',
          content: 'San Jose State University',
          type: 'education',
          status: 'in-progress'
        },
        {
          id: 'masters-cs',
          title: 'Master\'s in Computer Science',
          content: 'RV Institute of Technology',
          type: 'education',
          status: 'completed'
        },
        {
          id: 'bachelors-cs',
          title: 'Bachelor\'s in Computer Science',
          content: 'Visvesvaraya Technological University',
          type: 'education',
          status: 'completed'
        }
      ]
    },
    'experience': {
      id: 'experience',
      title: '💼 Experience',
      color: '#ed8936',
      cards: [
        {
          id: 'wabtec-se',
          title: 'Software Engineer - Wabtec Inc',
          content: 'Jul 2022 - Dec 2024',
          details: [
            'Guided a team of interns through the full software development lifecycle',
            'Directed comprehensive testing strategies across multiple projects',
            'Led end-to-end design, development, and integration of APIs and UI components using Django and React',
            'Implemented rigorous unit and integration testing protocols'
          ],
          type: 'experience'
        },
        {
          id: 'wabtec-intern',
          title: 'Software Engineering Intern - Wabtec Inc',
          content: 'Sep 2021 - Jun 2022',
          details: [
            'Designed and executed development of key company Dashboard using Power BI',
            'Analyzed Year-to-Date (YTD) performance and employee utilization metrics',
            'Transformed complex raw data from Excel into intuitive, real-time reports and dashboards'
          ],
          type: 'experience'
        }
      ]
    },
    'certifications': {
      id: 'certifications',
      title: '🏆 Certifications',
      color: '#9f7aea',
      cards: [
        {
          id: 'google-pm',
          title: 'Google Project Management',
          content: '2025',
          type: 'certification'
        },
        {
          id: 'six-sigma',
          title: 'Six Sigma Green Belt',
          content: 'Process Improvement & Quality Management',
          type: 'certification'
        },
        {
          id: 'pmi-acp',
          title: 'PMI Agile Certified Practitioner (PMI-ACP)',
          content: 'Agile Project Management',
          type: 'certification'
        },
        {
          id: 'csm',
          title: 'Certified ScrumMaster (CSM)',
          content: 'Scrum Framework & Agile Leadership',
          type: 'certification'
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
      newCardIds.splice(source.index, 1);
      newCardIds.splice(destination.index, 0, draggableId);

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
    startCardIds.splice(source.index, 1);
    const newStart = {
      ...start,
      cards: startCardIds,
    };

    const finishCardIds = Array.from(finish.cards);
    finishCardIds.splice(destination.index, 0, draggableId);
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
      <Header />
      <DragDropContext onDragEnd={onDragEnd}>
        <KanbanBoard columns={columns} onViewDetails={handleViewDetails} />
      </DragDropContext>
      <Modal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        card={selectedCard} 
      />
    </div>
  );
}

export default App;
