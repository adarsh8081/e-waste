import React from 'react';
import './Team.css';

const Team = () => {
  const teamMembers = [
    {
      name: 'Priya Goyal',
      role: 'Team Leader',
      education: 'B.Tech CSE AIML 2nd Year',
      image: '/team/Priya_goyal.jpg',
      description: 'A passionate AI/ML enthusiast with a strong foundation in computer science. Priya leads our team with her innovative ideas and technical expertise. She specializes in machine learning algorithms and is dedicated to creating sustainable solutions through technology.',
    },
    {
      name: 'Shivam Singh',
      role: 'Developer',
      education: 'B.Tech CSE CSF 3rd Year',
      image: '/team/Shivam_Singh.jpg',
      description: 'An experienced developer with expertise in cybersecurity and full-stack development. Shivam brings his knowledge of secure coding practices and system architecture to ensure our platform is robust and reliable.',
    },
    {
      name: 'Adarsh Kumar',
      role: 'Project Lead',
      education: 'B.Tech CSE AIML 4th Year',
      image: '/team/Adarsh_Kumar.png',
      description: 'A dedicated professional with extensive experience in AI/ML and e-waste management. As the project lead, Adarsh combines his technical expertise with a passion for environmental sustainability. He has been instrumental in developing innovative solutions for e-waste management and recycling.',
    },
    {
      name: 'Ishan',
      role: 'IoT Specialist',
      education: 'B.Tech 3rd Year',
      image: '/team/Ishan.jpg',
      description: 'A skilled IoT developer with a keen interest in smart devices and automation. Ishan works on integrating IoT solutions into our e-waste management system, making it more efficient and user-friendly.',
    },
  ];

  return (
    <div className="team-container">
      <h1 className="team-title">Our Team</h1>
      <p className="team-intro">
        Meet the dedicated professionals working towards a sustainable future in e-waste management.
        Our diverse team brings together expertise in technology, environmental science, and operations.
      </p>
      <div className="team-grid">
        {teamMembers.map((member, index) => (
          <div key={index} className="team-member-card">
            <div className="member-image-container">
              <img src={member.image} alt={member.name} className="member-image" />
            </div>
            <div className="member-info">
              <h2 className="member-name">{member.name}</h2>
              <p className="member-role">{member.role}</p>
              <p className="member-education">{member.education}</p>
              <p className="member-description">{member.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team; 