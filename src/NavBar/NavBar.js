import React from 'react';
import './NavBar.css';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Navbar = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const LI= styled.li`
    font-size:1.5em;
    text-align:center;
    color: rgb(62, 254, 55);
    font-weight: bold;
    transition: ease 200ms;
    
    &:hover {
      background-color: rgb(62, 254, 55);
      color: rgb(62, 90, 61);
      transition: ease 200ms;
    }
  `;

  function button_background(path){
    if(path == location.pathname){
      return {backgroundColor: 'rgb(62, 254, 55)',
              color: ' rgb(62, 90, 61)'}
    }else{
      return {}
    }
  }

  return (
    <nav className="navbar">
      <ul className='navlist'>
        <LI style={button_background("/FavCharList")} onClick={()=>navigate("/FavCharList")}><p classname='navlist-Link'>Fav. List</p></LI>
        <LI style={button_background("/AllChars")} onClick={()=>navigate("/AllChars")}><p classname='navlist-Link'>All Characters</p></LI>
        <LI style={button_background("/TierList")} onClick={()=>navigate("/TierList")}><p classname='navlist-Link'>Tier List</p></LI>
        <LI style={button_background("/About")} onClick={()=>navigate("/About")}><p classname='navlist-Link'>About</p></LI>
      </ul>
    </nav>
  );
};

export default Navbar;