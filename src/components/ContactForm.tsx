import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const FormContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(76, 172, 188, 0.1);
  border: 1px solid rgba(108, 196, 161, 0.2);
`;

const Title = styled.h2`
  font-size: 2.5rem;
  color: #2A4858;
  margin-bottom: 2rem;
  text-align: center;
  background: linear-gradient(45deg, #6CC4A1, #4CACBC);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Input = styled.input`
  padding: 1rem;
  border: 1px solid rgba(108, 196, 161, 0.3);
  border-radius: 10px;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.9);
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #4CACBC;
    box-shadow: 0 0 10px rgba(76, 172, 188, 0.2);
  }
`;

const TextArea = styled.textarea`
  padding: 1rem;
  border: 1px solid rgba(108, 196, 161, 0.3);
  border-radius: 10px;
  font-size: 1rem;
  min-height: 150px;
  resize: vertical;
  background: rgba(255, 255, 255, 0.9);
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #4CACBC;
    box-shadow: 0 0 10px rgba(76, 172, 188, 0.2);
  }
`;

const SubmitButton = styled(motion.button)`
  padding: 1rem 2.5rem;
  background: linear-gradient(45deg, #6CC4A1, #4CACBC);
  color: white;
  border: none;
  border-radius: 30px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(76, 172, 188, 0.3);
  transition: all 0.3s ease;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  color: #ff4444;
  font-size: 0.9rem;
  margin-top: 0.5rem;
`;

const SuccessMessage = styled(motion.div)`
  color: #4CACBC;
  text-align: center;
  padding: 1rem;
  border-radius: 10px;
  background: rgba(108, 196, 161, 0.1);
  margin-top: 1rem;
`;

interface FormData {
  name: string;
  email: string;
  message: string;
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validateForm = () => {
    const newErrors: Partial<FormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to send message');
      }

      const data = await response.json();
      
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', message: '' });

      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (error) {
      console.error('Error sending message:', error);
      setErrors({ 
        message: error instanceof Error 
          ? error.message 
          : 'Failed to connect to the server. Please try again later.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <FormContainer>
      <Title>Send us a Message</Title>
      <Form onSubmit={handleSubmit}>
        <div>
          <Input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
        </div>

        <div>
          <Input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
        </div>

        <div>
          <TextArea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
          />
          {errors.message && <ErrorMessage>{errors.message}</ErrorMessage>}
        </div>

        <SubmitButton
          type="submit"
          disabled={isSubmitting}
          whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
          whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </SubmitButton>

        {submitSuccess && (
          <SuccessMessage
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            Message sent successfully! We'll get back to you soon.
          </SuccessMessage>
        )}
      </Form>
    </FormContainer>
  );
};

export default ContactForm; 