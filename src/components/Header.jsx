import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

function Header() {
  return (
    <header className="header">
      <h1>LensArena</h1>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/signin">Sign In</Link>
        <Link to="/signup">Sign Up</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/gallery">Gallery</Link>
        <Link to="/edit-profile">Edit Profile</Link>
      </nav>
    </header>
  );
}

export default Header;

