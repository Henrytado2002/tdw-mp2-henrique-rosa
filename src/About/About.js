import './About.css';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import NavBar from '../NavBar/NavBar'

const H1 = styled.h1

function About() {

  return (
    <>
      <NavBar/>
      <div className='about-container'>
        <div className='About-title'>
          <h1>Hi! My name is Henrique Rosa</h1>
        </div>
        <div className='about-text'>
        <p>And this project was made with the specific purpose of demonstrating
          my expertise in not only Web Development with React.JS, but also with
          certain specific technologies, such as: </p>
        <div className='about-list-container'>
          <ul className='about-list'>
            <li>Redux</li>
            <li>RTK</li>
            <li>RTK Query</li>
            <li>Styled Components</li>
          </ul>
        </div>
        <p>This project will serve as an evaluation meter of my capability to understand and 
          apply these tools practically.
        </p>
        <p>I've chosen the Rick and Morty API because I'm a huge fan of the series. 
          The color pallet was chosen based on the colors of the portals that Rick opens throughout 
          the episodes with his portal gun, which is a recurring theme in the entire series.</p>
        </div>
        
      </div>
    </>
  );
}

export default About;
