import React from 'react';
import { GanttView } from './components/GanttView';
import { Header } from './components/Header';
import { Summary } from './components/Summary';
import { KanbanBoard } from './components/KanbanBoard';
import './App.css';

function App() {
  const currentDate = new Date();

  const tasks = [
    // Project: Experience
    {
      start: new Date(2025, 8, 1), // Sept 2025
      end: currentDate, // Present
      name: 'Associate Product Manager - AI Academy, San Jose State University',
      id: 'exp-new',
      type: 'task',
      progress: 100,
      isDisabled: true,
      styles: { progressColor: '#6554C0', progressSelectedColor: '#6554C0' }, // Purple
      project: 'Experience',
      details: 'Leading the design and development of the AI Academy MVP, coordinating cross-functional teams via Agile Scrum to build course management features. Partnering with faculty stakeholders to align product goals with academic objectives and prepare for a pilot launch.'
    },
    {
      start: new Date(2022, 6, 1),
      end: new Date(2024, 11, 31),
      name: 'Software Engineer - Wabtec Inc',
      id: 'exp-1',
      type: 'task',
      progress: 100,
      isDisabled: true,
      styles: { progressColor: '#6554C0', progressSelectedColor: '#6554C0' }, // Purple
      project: 'Experience',
      details: 'Guided interns, directed testing strategies, led API/UI development with Django & React.'
    },
    {
      start: new Date(2021, 8, 1),
      end: new Date(2022, 5, 30),
      name: 'Software Engineering Intern - Wabtec Inc',
      id: 'exp-2',
      type: 'task',
      progress: 100,
      isDisabled: true,
      styles: { progressColor: '#6554C0', progressSelectedColor: '#6554C0' }, // Purple
      project: 'Experience',
      details: 'Designed Power BI dashboards, analyzed performance metrics.'
    },
    // Project: Education
    {
      start: new Date(2025, 0, 1), // Jan 2025
      end: new Date(2026, 6, 31), // July 2026
      name: 'Master\'s in Engineering Management',
      id: 'edu-1',
      type: 'task',
      progress: 100,
      isDisabled: true,
      styles: { progressColor: '#36B37E', progressSelectedColor: '#36B37E' }, // Green
      project: 'Education',
      details: 'San Jose State University'
    },
    {
      start: new Date(2019, 7, 1),
      end: new Date(2021, 5, 1),
      name: 'Master\'s in Computer Science',
      id: 'edu-2',
      type: 'task',
      progress: 100,
      isDisabled: true,
      styles: { progressColor: '#36B37E', progressSelectedColor: '#36B37E' }, // Green
      project: 'Education',
      details: 'RV Institute of Technology'
    },
    {
      start: new Date(2015, 7, 1),
      end: new Date(2019, 5, 1),
      name: 'Bachelor\'s in Computer Science',
      id: 'edu-3',
      type: 'task',
      progress: 100,
      isDisabled: true,
      styles: { progressColor: '#36B37E', progressSelectedColor: '#36B37E' }, // Green
      project: 'Education',
      details: 'Visvesvaraya Technological University'
    }
  ];

  return (
    <div className="App">
      <div className="main-content">
        <Header />
        <Summary />
        <div className="view-container">
          <GanttView tasks={tasks} />

          <div style={{ marginTop: '40px', padding: '0 24px' }}>
            <h2 style={{ color: '#172B4D', fontSize: '20px', marginBottom: '20px' }}>Details Board</h2>
            <KanbanBoard
              columns={{
                skills: {
                  id: 'skills',
                  title: 'Skills',
                  cards: [
                    {
                      id: 's1',
                      title: 'Product Management',
                      details: 'Agile Development (Scrum, Kanban), Requirements Prioritization, Roadmapping & Release Planning, Go-to-Market (GTM) Strategy, KPI & Metrics Definition, Market & User Research, Product Lifecycle Management',
                      type: 'task', priority: 'high', assignee: 'YP', key: 'SK-1'
                    },
                    {
                      id: 's2',
                      title: 'Analytical & Technical',
                      details: 'Data-Driven Decision-Making, Forecasting, Dashboarding (Power BI, Excel), Process Optimization, AI & LLM Integration',
                      type: 'task', priority: 'high', assignee: 'YP', key: 'SK-2'
                    },
                    {
                      id: 's3',
                      title: 'Leadership & Collaboration',
                      details: 'Cross-Functional Coordination, Stakeholder Communication, Strategic Planning, Team Leadership, Adaptability',
                      type: 'task', priority: 'high', assignee: 'YP', key: 'SK-3'
                    },
                    {
                      id: 's4',
                      title: 'Tools',
                      details: 'JIRA, Notion, Trello, Monday.com, Power BI, MS Project, Excel',
                      type: 'task', priority: 'medium', assignee: 'YP', key: 'SK-4'
                    }
                  ]
                },
                education: {
                  id: 'education',
                  title: 'Education',
                  cards: tasks.filter(t => t.project === 'Education').map(t => ({
                    id: t.id,
                    title: t.name,
                    subtitle: t.details, // University Name
                    time: `${t.start.toLocaleString('default', { month: 'short', year: 'numeric' })} - ${t.end > new Date() ? 'Present' : t.end.toLocaleString('default', { month: 'short', year: 'numeric' })}`,
                    type: 'story',
                    priority: 'high',
                    assignee: 'YP',
                    key: t.id.toUpperCase()
                  }))
                },
                experience: {
                  id: 'experience',
                  title: 'Work Experience',
                  cards: tasks.filter(t => t.project === 'Experience').map(t => {
                    const [role, company] = t.name.split(' - ');
                    return {
                      id: t.id,
                      title: role,
                      subtitle: company,
                      details: t.details,
                      time: `${t.start.toLocaleString('default', { month: 'short', year: 'numeric' })} - ${t.end > new Date() ? 'Present' : t.end.toLocaleString('default', { month: 'short', year: 'numeric' })}`,
                      type: 'bug',
                      priority: 'highest',
                      assignee: 'YP',
                      key: t.id.toUpperCase()
                    };
                  })
                }
              }}
              onViewDetails={(card) => console.log('View details', card)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
