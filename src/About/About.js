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
        <h1></h1>
      </div>
    </>
  );
}

export default About;
