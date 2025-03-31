import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import logoImage from '../assets/logo.png';

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(26, 42, 58, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.2);
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 1rem;
  position: relative;
  padding: 0.5rem;
  
  &:hover {
    .logo-container {
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(76, 172, 188, 0.2);
    }
    
    .hindi-text {
      color: #A0D995;
      text-shadow: 0 0 15px rgba(160, 217, 149, 0.5);
    }

    .logo-image {
      filter: drop-shadow(0 0 8px rgba(76, 172, 188, 0.4));
    }
  }
`;

const LogoContainer = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  padding: 0.7rem 1.2rem;
  border-radius: 12px;
  position: relative;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);

  .logo-image {
    width: 48px;
    height: 48px;
    object-fit: contain;
    transition: filter 0.3s ease;
  }
`;

const LogoText = styled.div`
  display: flex;
  align-items: center;
  position: relative;

  .hindi-text {
    font-size: 2.2rem;
    font-weight: 700;
    color: #A0D995;
    transition: all 0.3s ease;
    font-family: 'Noto Sans Devanagari', 'Arial', sans-serif;
    background: linear-gradient(45deg, #4CACBC, #A0D995);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
    letter-spacing: 1px;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2.5rem;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  color: #A0D995;
  text-decoration: none;
  font-weight: 500;
  font-size: 1.1rem;
  position: relative;
  padding: 0.5rem 0;
  transition: color 0.3s ease;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(90deg, #4CACBC, #A0D995);
    transition: width 0.3s ease;
  }

  &:hover::after,
  &.active::after {
    width: 100%;
  }

  &:hover {
    color: #4CACBC;
  }

  &.active {
    color: #4CACBC;
  }
`;

const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: #A0D995;
  font-size: 1.8rem;
  cursor: pointer;
  padding: 0.5rem;
  transition: color 0.3s ease;

  &:hover {
    color: #4CACBC;
  }

  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled(motion.div)`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 70px;
    left: 0;
    right: 0;
    background: rgba(26, 42, 58, 0.98);
    padding: 1rem;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(10px);
  }
`;

const MobileNavLink = styled(NavLink)`
  padding: 1rem 0;
  width: 100%;
  text-align: center;
  font-size: 1.2rem;
`;

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <Nav>
      <Logo to="/">
        <LogoContainer
          className="logo-container"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <img src={logoImage} alt="E-Waste Logo" className="logo-image" />
          <LogoText>
            <span className="hindi-text">कचरा</span>
          </LogoText>
        </LogoContainer>
      </Logo>
      <NavLinks>
        <NavLink to="/" className={location.pathname === '/' ? 'active' : ''}>
          Home
        </NavLink>
        <NavLink to="/about" className={location.pathname === '/about' ? 'active' : ''}>
          About
        </NavLink>
        <NavLink to="/products" className={location.pathname === '/products' ? 'active' : ''}>
          Products
        </NavLink>
        <NavLink to="/solution" className={location.pathname === '/solution' ? 'active' : ''}>
          Solution
        </NavLink>
        <NavLink to="/team" className={location.pathname === '/team' ? 'active' : ''}>
          Team
        </NavLink>
        <NavLink to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>
          Contact
        </NavLink>
      </NavLinks>
      <MenuButton onClick={toggleMenu}>
        {isMenuOpen ? '✕' : '☰'}
      </MenuButton>
      <MobileMenu
        initial={false}
        animate={isMenuOpen ? 'open' : 'closed'}
        variants={{
          open: { opacity: 1, height: 'auto' },
          closed: { opacity: 0, height: 0 }
        }}
        transition={{ duration: 0.3 }}
      >
        <MobileNavLink to="/" className={location.pathname === '/' ? 'active' : ''}>
          Home
        </MobileNavLink>
        <MobileNavLink to="/about" className={location.pathname === '/about' ? 'active' : ''}>
          About
        </MobileNavLink>
        <MobileNavLink to="/products" className={location.pathname === '/products' ? 'active' : ''}>
          Products
        </MobileNavLink>
        <MobileNavLink to="/solution" className={location.pathname === '/solution' ? 'active' : ''}>
          Solution
        </MobileNavLink>
        <MobileNavLink to="/team" className={location.pathname === '/team' ? 'active' : ''}>
          Team
        </MobileNavLink>
        <MobileNavLink to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>
          Contact
        </MobileNavLink>
      </MobileMenu>
    </Nav>
  );
};

export default Navbar; 