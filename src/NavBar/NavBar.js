import React from 'react';
import './NavBar.css';

const Navbar = () => {
  return (

<nav className="navbar">
  <div className="navbar-left">
    <a href="/" className="logo">
      ShopNow
    </a>
  </div>
  <div className="navbar-center">
    <ul className="nav-links">
      <li>
        <a href="/products">Products</a>
      </li>
      <li>
        <a href="/about">About Us</a>
      </li>
      
    </ul>
  </div>
  <div className="navbar-right">
    
    
  </div>
</nav>
);
};

export default Navbar;