import React, { useEffect } from 'react';
import styled from 'styled-components';
import '../styles/Team.css';

type TeamMember = {
  id: number;
  name: string;
  role: string;
  image: string;
  bio: string;
};

const MemberImage = styled.div`
  width: 300px;
  height: 300px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 1rem;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
`;

const Team: React.FC = () => {
  useEffect(() => {
    console.log('Team component mounted');
  }, []);

  const defaultProfileImage = "https://via.placeholder.com/300x300.png?text=Team+Member";
  
  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: 'John Smith',
      role: 'Founder & CEO',
      image: defaultProfileImage,
      bio: 'With over 15 years of experience in e-waste management, John leads our mission to create a sustainable future.'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      role: 'Operations Director',
      image: defaultProfileImage,
      bio: 'Sarah oversees our recycling operations and ensures the highest standards of environmental compliance.'
    },
    {
      id: 3,
      name: 'Michael Chen',
      role: 'Technical Lead',
      image: defaultProfileImage,
      bio: 'Michael brings innovative solutions to our e-waste processing methods and leads our R&D initiatives.'
    },
    {
      id: 4,
      name: 'Emily Rodriguez',
      role: 'Sustainability Manager',
      image: defaultProfileImage,
      bio: 'Emily develops and implements our environmental policies and community outreach programs.'
    }
  ];

  return (
    <div className="team-container" style={{ 
      minHeight: '100vh',
      paddingTop: '2rem',
      position: 'relative',
      zIndex: 1
    }}>
      <div className="team-header">
        <h1 style={{ color: '#915EFF' }}>Our Team</h1>
        <p className="team-intro" style={{ color: '#e2e2e2' }}>
          Meet the dedicated professionals working towards a sustainable future in e-waste management.
          Our diverse team brings together expertise in technology, environmental science, and operations.
        </p>
      </div>

      <div className="team-grid">
        {teamMembers.map((member) => (
          <div key={member.id} className="team-member">
            <div className="member-image">
              <MemberImage>
                <img
                  src={member.image}
                  alt={member.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </MemberImage>
            </div>
            <h3>{member.name}</h3>
            <p className="role">{member.role}</p>
            <p className="bio">{member.bio}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team; 