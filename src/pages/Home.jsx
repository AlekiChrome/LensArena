import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

function Home() {
  return (
    <div className="home-container">
      <section className="hero-section">
        <div className="hero-content">
          <h1>Welcome to LensArena 📸</h1>
          <p>
            Discover photography and videography contests from around the world.
            Compete. Connect. Be seen.
          </p>
          <Link to="/contests">
            <button className="cta-button">Browse Contests</button>
          </Link>
        </div>
        <div className="hero-image" />
      </section>

      <section className="features-section">
        <h2>Why LensArena?</h2>
        <div className="features-grid">
          <div className="feature-box">
            <h3>🎯 Targeted Opportunities</h3>
            <p>Find contests by theme, location, or prize type. All in one place.</p>
          </div>
          <div className="feature-box">
            <h3>🚀 Build Your Profile</h3>
            <p>Upload and showcase your work. Get seen by the world.</p>
          </div>
          <div className="feature-box">
            <h3>🌍 Global Community</h3>
            <p>Follow artists, comment on submissions, and grow together.</p>
          </div>
        </div>
      </section>

      <section className="call-to-action">
        <h2>Ready to share your vision?</h2>
        <Link to="/signup">
          <button className="cta-button">Join LensArena</button>
        </Link>
      </section>
    </div>
  );
}

export default Home;
