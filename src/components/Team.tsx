import React from 'react';
import { FaLinkedin, FaGithub, FaEnvelope, FaGlobe } from 'react-icons/fa';
import '../styles/Team.css';

type TeamMember = {
  id: number;
  name: string;
  role: string;
  education: string;
  bio: string;
  expertise: string[];
  image: string;
  social: {
    linkedin?: string;
    github?: string;
    email?: string;
    website?: string;
  };
};

const Team: React.FC = () => {
  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: 'Priya Goyal',
      role: 'Team Leader',
      education: 'B.Tech CSE AIML 2nd Year',
      bio: 'A passionate leader and innovator in the field of AI/ML, dedicated to creating sustainable solutions for e-waste management. With a strong foundation in computer science and environmental technology, Priya leads our team towards developing cutting-edge solutions that make a real impact.',
      expertise: [
        'Artificial Intelligence',
        'Machine Learning',
        'Team Leadership',
        'Project Management',
        'Environmental Technology'
      ],
      image: '/team/Priya_goyal.jpg',
      social: {
        linkedin: '#',
        github: '#',
        email: 'mailto:priya@example.com',
        website: '#'
      }
    },
    {
      id: 2,
      name: 'Shivam Singh',
      role: 'Lead Developer',
      education: 'B.Tech CSE CSF 3rd Year',
      bio: 'A skilled developer with expertise in cybersecurity and full-stack development. Shivam brings technical excellence and innovation to our e-waste management solutions, ensuring robust and secure implementations that scale.',
      expertise: [
        'Full Stack Development',
        'Cybersecurity',
        'System Architecture',
        'Database Design',
        'API Development'
      ],
      image: '/team/Shivam_Singh.jpg',
      social: {
        linkedin: '#',
        github: '#',
        email: 'mailto:shivam@example.com'
      }
    },
    {
      id: 3,
      name: 'Adarsh Kumar',
      role: 'Project Lead',
      education: 'B.Tech CSE AIML 4th Year',
      bio: 'An innovative project leader combining expertise in AI/ML with environmental consciousness. Adarsh drives our initiatives forward with a focus on creating sustainable, scalable solutions for e-waste management challenges.',
      expertise: [
        'Project Management',
        'AI/ML Implementation',
        'Environmental Solutions',
        'Research & Development',
        'Strategic Planning'
      ],
      image: '/team/Adarsh_Kumar.png',
      social: {
        linkedin: '#',
        github: '#',
        email: 'mailto:adarsh@example.com',
        website: '#'
      }
    },
    {
      id: 4,
      name: 'Ishan',
      role: 'IoT Specialist',
      education: 'B.Tech 3rd Year',
      bio: 'A talented IoT specialist focusing on creating smart, connected solutions for e-waste management. Ishan combines hardware expertise with software innovation to build intelligent systems that revolutionize waste tracking and processing.',
      expertise: [
        'IoT Development',
        'Embedded Systems',
        'Sensor Integration',
        'Hardware Design',
        'Automation'
      ],
      image: '/team/Ishan.jpg',
      social: {
        linkedin: '#',
        github: '#',
        email: 'mailto:ishan@example.com'
      }
    }
  ];

  return (
    <div className="team-container">
      <div className="team-content">
        <div className="team-header">
          <h1>Our Team</h1>
          <p className="team-intro">
            Meet our exceptional team of innovators and environmental champions who are
            revolutionizing e-waste management through cutting-edge technology and
            sustainable solutions.
          </p>
        </div>
        <div className="team-grid">
          {teamMembers.map((member) => (
            <div key={member.id} className="team-card">
              <div className="member-image">
                <img src={member.image} alt={member.name} />
              </div>
              <div className="member-info">
                <h3>{member.name}</h3>
                <p className="role">{member.role}</p>
                <p className="education">{member.education}</p>
                <div className="member-details">
                  <p className="bio">{member.bio}</p>
                  <div className="expertise">
                    <h4>Areas of Expertise</h4>
                    <div className="tags">
                      {member.expertise.map((skill, index) => (
                        <span key={index} className="tag">{skill}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="social-links">
                  {member.social.linkedin && (
                    <a href={member.social.linkedin} className="social-link" target="_blank" rel="noopener noreferrer">
                      <FaLinkedin />
                    </a>
                  )}
                  {member.social.github && (
                    <a href={member.social.github} className="social-link" target="_blank" rel="noopener noreferrer">
                      <FaGithub />
                    </a>
                  )}
                  {member.social.email && (
                    <a href={member.social.email} className="social-link">
                      <FaEnvelope />
                    </a>
                  )}
                  {member.social.website && (
                    <a href={member.social.website} className="social-link" target="_blank" rel="noopener noreferrer">
                      <FaGlobe />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Team; 