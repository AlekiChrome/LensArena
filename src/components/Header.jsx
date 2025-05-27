import React from 'react';
import '../styles/Header.css';

function Header() {
  return (
    <header className="header">
      <h1>LensArena</h1>
      <nav>
        <a href="/">Home</a>
        <a href="/contests">Contests</a>
      </nav>
    </header>
  );
}

export default Header;
