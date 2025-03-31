import React from 'react';
import styled from 'styled-components';
import ContactForm from '../components/ContactForm';

const ContactContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #F6E3C5 0%, #A0D995 100%);
  padding: 4rem 2rem;
`;

const ContactContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const ContactHeader = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  color: #2A4858;
  margin-bottom: 1.5rem;
  background: linear-gradient(45deg, #6CC4A1, #4CACBC);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #4A6670;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

const Contact: React.FC = () => {
  return (
    <ContactContainer>
      <ContactContent>
        <ContactHeader>
          <Title>Get in Touch</Title>
          <Subtitle>
            Have questions about our e-waste management solutions? We'd love to hear from you.
            Our team is here to help and respond to your queries.
          </Subtitle>
        </ContactHeader>
        <ContactForm />
      </ContactContent>
    </ContactContainer>
  );
};

export default Contact; 