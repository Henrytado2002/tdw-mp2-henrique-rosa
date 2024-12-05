import React, { useState } from 'react';
import './NavBar.css';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(false);

  const LI = styled.li`
    font-size: 1.5em;
    text-align: center;
    color: rgb(62, 254, 55);
    font-weight: bold;
    transition: ease 200ms;

    &:hover {
      background-color: rgb(62, 254, 55);
      color: rgb(62, 90, 61);
      transition: ease 200ms;
    }
  `;

  const buttonBackground = (path) => {
    if (path === location.pathname) {
      return {
        backgroundColor: 'rgb(62, 254, 55)',
        color: 'rgb(62, 90, 61)',
      };
    } else {
      return {};
    }
  };

  const handleNavigation = (path) => {
    if (location.pathname !== path) {
      setIsTransitioning(true);

      // Delay navigation to allow the animation to play
      setTimeout(() => {
        navigate(path);
        setIsTransitioning(false);
      }, 500); // Match the duration of your exit animation
    }
  };

  return (
    <nav className="navbar">
      <motion.div
        className="transition-overlay"
        initial={{ scaleY: 1 }}
        animate={isTransitioning ? { scaleY: 0 } : { scaleY: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgb(62, 90, 61)',
          zIndex: 10,
        }}
      />

      <ul className="navlist">
        <LI
          style={buttonBackground('/FavCharList')}
          onClick={() => handleNavigation('/FavCharList')}
        >
          <p className="navlist-Link">Fav. List</p>
        </LI>
        <LI
          style={buttonBackground('/AllChars')}
          onClick={() => handleNavigation('/AllChars')}
        >
          <p className="navlist-Link">All Characters</p>
        </LI>
        <LI
          style={buttonBackground('/TierList')}
          onClick={() => handleNavigation('/TierList')}
        >
          <p className="navlist-Link">Tier List</p>
        </LI>
        <LI
          style={buttonBackground('/About')}
          onClick={() => handleNavigation('/About')}
        >
          <p className="navlist-Link">About</p>
        </LI>
      </ul>
    </nav>
  );
};

export default Navbar;
