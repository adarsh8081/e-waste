import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const ContactContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #F6E3C5 0%, #A0D995 100%);
  color: #2A4858;
  padding: 4rem 2rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 20%, rgba(108, 196, 161, 0.15) 0%, transparent 40%),
      radial-gradient(circle at 80% 80%, rgba(76, 172, 188, 0.15) 0%, transparent 40%);
    pointer-events: none;
  }
`;

const ContactContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const ContactForm = styled(motion.div)`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 3rem;
  border: 1px solid rgba(108, 196, 161, 0.2);
  box-shadow: 0 8px 32px rgba(76, 172, 188, 0.1);

  h2 {
    font-size: 2rem;
    margin-bottom: 2rem;
    background: linear-gradient(45deg, #6CC4A1, #4CACBC);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: 0 0 20px rgba(76, 172, 188, 0.3);
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(108, 196, 161, 0.2);
  border-radius: 10px;
  color: #2A4858;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #6CC4A1;
    box-shadow: 0 0 15px rgba(76, 172, 188, 0.2);
  }

  &::placeholder {
    color: rgba(42, 72, 88, 0.5);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(108, 196, 161, 0.2);
  border-radius: 10px;
  color: #2A4858;
  font-size: 1rem;
  min-height: 150px;
  resize: vertical;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #6CC4A1;
    box-shadow: 0 0 15px rgba(76, 172, 188, 0.2);
  }

  &::placeholder {
    color: rgba(42, 72, 88, 0.5);
  }
`;

const SubmitButton = styled(motion.button)`
  background: linear-gradient(45deg, #6CC4A1, #4CACBC);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 30px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  width: 100%;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(76, 172, 188, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(76, 172, 188, 0.4);
  }
`;

const ContactInfo = styled(motion.div)`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 3rem;
  border: 1px solid rgba(108, 196, 161, 0.2);
  box-shadow: 0 8px 32px rgba(76, 172, 188, 0.1);

  h2 {
    font-size: 2rem;
    margin-bottom: 2rem;
    background: linear-gradient(45deg, #6CC4A1, #4CACBC);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: 0 0 20px rgba(76, 172, 188, 0.3);
  }
`;

const InfoItem = styled(motion.div)`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 15px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateX(10px);
    background: rgba(160, 217, 149, 0.1);
  }

  i {
    font-size: 2rem;
    margin-right: 1.5rem;
    background: linear-gradient(45deg, #6CC4A1, #4CACBC);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  p {
    font-size: 1.1rem;
    color: #2A4858;
  }
`;

const FloatingParticles = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 0;

  &::before, &::after {
    content: '';
    position: absolute;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: rgba(145, 94, 255, 0.5);
    animation: float 4s infinite;
  }

  &::before {
    top: 20%;
    left: 20%;
    animation-delay: -2s;
  }

  &::after {
    bottom: 20%;
    right: 20%;
  }

  @keyframes float {
    0%, 100% { transform: translate(0, 0); opacity: 0.2; }
    50% { transform: translate(10px, -10px); opacity: 0.8; }
  }
`;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <ContactContainer>
      <FloatingParticles />
      <ContactContent>
        <ContactForm
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2>Send us a Message</h2>
          <form onSubmit={handleSubmit}>
            <FormGroup>
              <Input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <TextArea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <SubmitButton
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Send Message
            </SubmitButton>
          </form>
        </ContactForm>

        <ContactInfo
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2>Get in Touch</h2>
          <InfoItem
            whileHover={{ x: 10 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <i className="fas fa-map-marker-alt"></i>
            <p>GLA UNIVERSITY, MATHURA 281406</p>
          </InfoItem>
          <InfoItem
            whileHover={{ x: 10 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <i className="fas fa-phone"></i>
            <p>+91 9005609660</p>
          </InfoItem>
          <InfoItem
            whileHover={{ x: 10 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <i className="fas fa-envelope"></i>
            <p>Adarsh.kumar_cs.aiml21@gla.ac.in</p>
          </InfoItem>
        </ContactInfo>
      </ContactContent>
    </ContactContainer>
  );
};

export default Contact; 