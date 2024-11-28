import React from 'react';
import './NavBar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (

<nav className="navbar">
  <ul>
    <li><Link to={'/FavCharList'}>FavChar</Link></li>
    <li><Link to={'/AllChars'}>AllChars</Link></li>
    <li><Link to={'/TierList'}>TierList</Link></li>
  </ul>
</nav>
);
};

export default Navbar;