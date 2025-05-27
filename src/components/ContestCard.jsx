import React from 'react';
import '../styles/ContestCard.css';

function ContestCard({ title, deadline, prize, entryFee }) {
  return (
    <div className="contest-card">
      <h3>{title}</h3>
      <p><strong>Deadline:</strong> {deadline}</p>
      <p><strong>Prize:</strong> {prize}</p>
      <p><strong>Entry:</strong> {entryFee}</p>
    </div>
  );
}

export default ContestCard;
