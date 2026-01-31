import React from 'react';
import { X, Calendar, Award, GraduationCap, Wrench, ExternalLink } from 'lucide-react';
import './Modal.css';

const getModalIcon = (type) => {
  switch (type) {
    case 'experience':
      return <Calendar size={24} />;
    case 'certification':
      return <Award size={24} />;
    case 'education':
      return <GraduationCap size={24} />;
    case 'skills':
      return <Wrench size={24} />;
    default:
      return <Wrench size={24} />;
  }
};

export const Modal = ({ isOpen, onClose, card }) => {
  if (!isOpen || !card) return null;

  const getDetailedContent = (card) => {
    switch (card.id) {
      case 'masters-em':
        return {
          title: 'Master\'s in Engineering Management',
          institution: 'San Jose State University',
          duration: 'Jan 2025 - Jun 2026',
          status: 'In Progress',
          courses: [
            'Project Management Fundamentals',
            'Engineering Leadership & Strategy',
            'Cross-functional Team Management',
            'Risk Management & Quality Assurance',
            'Agile Project Management',
            'Stakeholder Management',
            'Engineering Economics',
            'Operations Management'
          ],
          highlights: [
            'Focus on technical leadership and project management',
            'Integration of engineering principles with business strategy',
            'Hands-on experience with real-world engineering projects',
            'Networking with industry professionals and alumni',
            'Preparation for senior engineering management roles'
          ],
          skills: ['Leadership', 'Strategic Planning', 'Team Management', 'Risk Assessment', 'Agile Methodologies']
        };

      case 'masters-cs':
        return {
          title: 'Master\'s in Computer Science',
          institution: 'RV Institute of Technology',
          duration: 'Jan 2021 - Jul 2022',
          status: 'Completed',
          courses: [
            'Advanced Algorithms & Data Structures',
            'Software Engineering & Design Patterns',
            'Database Systems & Management',
            'Computer Networks & Security',
            'Machine Learning & AI',
            'Distributed Systems',
            'Research Methodology',
            'Thesis Project'
          ],
          highlights: [
            'Specialized in software engineering and system design',
            'Completed comprehensive thesis on distributed systems',
            'Gained expertise in modern development frameworks',
            'Participated in research projects and publications',
            'Achieved distinction in advanced programming courses'
          ],
          skills: ['Software Engineering', 'System Design', 'Algorithms', 'Database Management', 'Research']
        };

      case 'bachelors-cs':
        return {
          title: 'Bachelor\'s in Computer Science',
          institution: 'Visvesvaraya Technological University',
          duration: 'Aug 2015 - Jul 2019',
          status: 'Completed',
          courses: [
            'Programming Fundamentals (C, C++, Java)',
            'Data Structures & Algorithms',
            'Computer Organization & Architecture',
            'Operating Systems',
            'Database Management Systems',
            'Software Engineering',
            'Computer Networks',
            'Web Technologies'
          ],
          highlights: [
            'Strong foundation in programming and computer science fundamentals',
            'Active participation in coding competitions and hackathons',
            'Completed multiple software development projects',
            'Maintained excellent academic performance throughout',
            'Developed problem-solving and analytical thinking skills'
          ],
          skills: ['Programming', 'Problem Solving', 'System Analysis', 'Web Development', 'Database Design']
        };

      case 'wabtec-se':
        return {
          title: 'Software Engineer - Wabtec Inc',
          duration: 'Jul 2022 - Dec 2024',
          status: 'Completed',
          projects: [
            'API Integration & UI Development',
            'Testing Framework Implementation',
            'Team Leadership & Mentoring',
            'Quality Assurance & Process Improvement'
          ],
          highlights: [
            'Led a team of 3 interns through full software development lifecycle',
            'Reduced post-release defects by 25% through rigorous testing protocols',
            'Improved system performance by 30% through API optimization',
            'Mentored junior developers and conducted technical training sessions',
            'Collaborated with cross-functional teams on multiple high-impact projects'
          ],
          technologies: ['Django', 'React', 'Python', 'JavaScript', 'Wireshark', 'Git', 'Jira'],
          achievements: [
            'Team Performance Improvement Award',
            'Quality Excellence Recognition',
            'Mentorship Excellence Award'
          ]
        };

      case 'wabtec-intern':
        return {
          title: 'Software Engineering Intern - Wabtec Inc',
          duration: 'Sep 2021 - Jun 2022',
          status: 'Completed',
          projects: [
            'Company Dashboard Development',
            'Data Analytics & Visualization',
            'Performance Metrics Analysis',
            'Report Generation & Automation'
          ],
          highlights: [
            'Designed and developed key company dashboard using Power BI',
            'Improved reporting efficiency by 40% through automation',
            'Analyzed YTD performance and employee utilization metrics',
            'Transformed complex Excel data into intuitive real-time reports',
            'Supported management decision-making with data-driven insights'
          ],
          technologies: ['Power BI', 'Excel', 'SQL', 'Python', 'Data Visualization'],
          achievements: [
            'Outstanding Intern Performance Award',
            'Innovation in Data Analytics Recognition',
            'Management Appreciation for Dashboard Project'
          ]
        };

      case 'google-pm':
        return {
          title: 'Google Project Management Certification',
          issuer: 'Google',
          year: '2025',
          status: 'Active',
          modules: [
            'Foundations of Project Management',
            'Project Initiation: Starting a Successful Project',
            'Project Planning: Putting It All Together',
            'Project Execution: Running the Project',
            'Agile Project Management',
            'Applying Project Management in the Real World'
          ],
          highlights: [
            'Comprehensive understanding of project management methodologies',
            'Hands-on experience with Google\'s project management tools',
            'Real-world project scenarios and case studies',
            'Integration of agile and traditional project management approaches',
            'Industry-recognized certification from Google'
          ],
          skills: ['Project Planning', 'Risk Management', 'Stakeholder Communication', 'Agile Methodologies', 'Quality Management']
        };

      case 'six-sigma':
        return {
          title: 'Six Sigma Green Belt',
          issuer: 'Six Sigma Institute',
          status: 'Active',
          modules: [
            'DMAIC Methodology (Define, Measure, Analyze, Improve, Control)',
            'Statistical Analysis & Data Collection',
            'Process Mapping & Analysis',
            'Root Cause Analysis',
            'Quality Improvement Tools',
            'Change Management & Implementation'
          ],
          highlights: [
            'Expertise in process improvement and quality management',
            'Statistical analysis and problem-solving methodologies',
            'Experience with quality improvement tools and techniques',
            'Ability to lead process improvement projects',
            'Industry-standard certification in quality management'
          ],
          skills: ['Process Improvement', 'Statistical Analysis', 'Quality Management', 'Root Cause Analysis', 'Change Management']
        };

      case 'pmi-acp':
        return {
          title: 'PMI Agile Certified Practitioner (PMI-ACP)',
          issuer: 'Project Management Institute',
          status: 'Active',
          domains: [
            'Agile Principles and Mindset',
            'Value-Driven Delivery',
            'Stakeholder Engagement',
            'Team Performance',
            'Adaptive Planning',
            'Problem Detection and Resolution',
            'Continuous Improvement'
          ],
          highlights: [
            'Comprehensive knowledge of agile methodologies and frameworks',
            'Experience with Scrum, Kanban, and hybrid approaches',
            'Ability to lead agile teams and facilitate ceremonies',
            'Understanding of agile principles and values',
            'Industry-recognized certification from PMI'
          ],
          skills: ['Agile Methodologies', 'Scrum', 'Kanban', 'Team Facilitation', 'Continuous Improvement']
        };

      case 'csm':
        return {
          title: 'Certified ScrumMaster (CSM)',
          issuer: 'Scrum Alliance',
          status: 'Active',
          topics: [
            'Scrum Framework & Values',
            'Scrum Roles & Responsibilities',
            'Scrum Events & Ceremonies',
            'Scrum Artifacts',
            'Servant Leadership',
            'Facilitation & Coaching',
            'Impediment Removal'
          ],
          highlights: [
            'Deep understanding of Scrum framework and principles',
            'Ability to facilitate Scrum ceremonies effectively',
            'Skills in coaching and mentoring development teams',
            'Expertise in impediment identification and removal',
            'Industry-standard certification from Scrum Alliance'
          ],
          skills: ['Scrum Framework', 'Team Facilitation', 'Servant Leadership', 'Coaching', 'Impediment Removal']
        };

      default:
        return {
          title: card.title,
          content: card.content,
          highlights: card.details || []
        };
    }
  };

  const detailedContent = getDetailedContent(card);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-section">
            <div className="modal-icon">
              {getModalIcon(card.type)}
            </div>
            <div>
              <h2 className="modal-title">{detailedContent.title}</h2>
              {detailedContent.institution && (
                <p className="modal-subtitle">{detailedContent.institution}</p>
              )}
              {detailedContent.issuer && (
                <p className="modal-subtitle">Issued by {detailedContent.issuer}</p>
              )}
            </div>
          </div>
          <button className="modal-close" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="modal-body">
          <div className="modal-meta">
            {detailedContent.duration && (
              <div className="meta-item">
                <Calendar size={16} />
                <span>{detailedContent.duration}</span>
              </div>
            )}
            {detailedContent.year && (
              <div className="meta-item">
                <Award size={16} />
                <span>{detailedContent.year}</span>
              </div>
            )}
            <div className="meta-item">
              <span className={`status-badge ${detailedContent.status?.toLowerCase().replace(' ', '-')}`}>
                {detailedContent.status}
              </span>
            </div>
          </div>

          {detailedContent.courses && (
            <div className="modal-section">
              <h3>Courses & Curriculum</h3>
              <div className="courses-grid">
                {detailedContent.courses.map((course, index) => (
                  <div key={index} className="course-item">
                    {course}
                  </div>
                ))}
              </div>
            </div>
          )}

          {detailedContent.modules && (
            <div className="modal-section">
              <h3>Certification Modules</h3>
              <div className="courses-grid">
                {detailedContent.modules.map((module, index) => (
                  <div key={index} className="course-item">
                    {module}
                  </div>
                ))}
              </div>
            </div>
          )}

          {detailedContent.domains && (
            <div className="modal-section">
              <h3>Knowledge Domains</h3>
              <div className="courses-grid">
                {detailedContent.domains.map((domain, index) => (
                  <div key={index} className="course-item">
                    {domain}
                  </div>
                ))}
              </div>
            </div>
          )}

          {detailedContent.projects && (
            <div className="modal-section">
              <h3>Key Projects</h3>
              <div className="courses-grid">
                {detailedContent.projects.map((project, index) => (
                  <div key={index} className="course-item">
                    {project}
                  </div>
                ))}
              </div>
            </div>
          )}

          {detailedContent.topics && (
            <div className="modal-section">
              <h3>Topics Covered</h3>
              <div className="courses-grid">
                {detailedContent.topics.map((topic, index) => (
                  <div key={index} className="course-item">
                    {topic}
                  </div>
                ))}
              </div>
            </div>
          )}

          {detailedContent.highlights && (
            <div className="modal-section">
              <h3>Key Highlights</h3>
              <ul className="highlights-list">
                {detailedContent.highlights.map((highlight, index) => (
                  <li key={index} className="highlight-item">
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {detailedContent.technologies && (
            <div className="modal-section">
              <h3>Technologies Used</h3>
              <div className="skills-tags">
                {detailedContent.technologies.map((tech, index) => (
                  <span key={index} className="skill-tag">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {detailedContent.skills && (
            <div className="modal-section">
              <h3>Skills Developed</h3>
              <div className="skills-tags">
                {detailedContent.skills.map((skill, index) => (
                  <span key={index} className="skill-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {detailedContent.achievements && (
            <div className="modal-section">
              <h3>Achievements & Recognition</h3>
              <ul className="highlights-list">
                {detailedContent.achievements.map((achievement, index) => (
                  <li key={index} className="highlight-item achievement">
                    🏆 {achievement}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
