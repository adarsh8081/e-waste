import React from 'react';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #0a0a20 0%, #1a1a2d 100%);
  z-index: 9999;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 20%, rgba(98, 0, 255, 0.15) 0%, transparent 40%),
      radial-gradient(circle at 80% 80%, rgba(0, 255, 200, 0.15) 0%, transparent 40%);
    pointer-events: none;
  }
`;

const LoaderContainer = styled.div`
  position: relative;
  width: 120px;
  height: 120px;
`;

const Circle = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 2px solid transparent;
  border-top-color: #915EFF;
  animation: spin 1s linear infinite;

  &::before, &::after {
    content: '';
    position: absolute;
    border-radius: 50%;
    border: 2px solid transparent;
  }

  &::before {
    top: 5px;
    left: 5px;
    right: 5px;
    bottom: 5px;
    border-top-color: #00ffcc;
    animation: spin 2s linear infinite;
  }

  &::after {
    top: 15px;
    left: 15px;
    right: 15px;
    bottom: 15px;
    border-top-color: #6B46C1;
    animation: spin 1.5s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const GlowingText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1rem;
  font-weight: 600;
  color: white;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-shadow: 0 0 10px rgba(145, 94, 255, 0.8);
  animation: pulse 2s ease-in-out infinite;

  @keyframes pulse {
    0%, 100% { opacity: 0.5; }
    50% { opacity: 1; }
  }
`;

const Particles = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  
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

const Loader = () => {
  return (
    <StyledWrapper>
      <LoaderContainer>
        <Circle />
        <GlowingText>Loading</GlowingText>
        <Particles />
      </LoaderContainer>
    </StyledWrapper>
  );
}

export default Loader; 