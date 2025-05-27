import React from 'react';
import ContestCard from '../components/ContestCard';
import '../styles/Home.css';

function Home() {
  return (
    <div className="home">
      <section className="hero">
        <h1>Welcome to LensArena</h1>
        <p>Your go-to hub for photography and videography contests—local to global.</p>
        <a href="/contests" className="cta-button">Browse Contests</a>
      </section>

      <section className="featured">
        <h2>Featured Contests</h2>
        <div className="featured-grid">
          <ContestCard
            title="Global Nature Awards"
            deadline="July 15, 2025"
            prize="$5,000"
            entryFee="Paid"
          />
          <ContestCard
            title="Urban Photo Story"
            deadline="June 30, 2025"
            prize="Exposure + Gear"
            entryFee="Free"
          />
        </div>
      </section>
    </div>
  );
}

export default Home;
