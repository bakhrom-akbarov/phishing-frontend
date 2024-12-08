import React from 'react';
import { Link } from 'react-router-dom';

export const Home: React.FC = () => {
  return (
    <div>
      <h1>Welcome to the Phishing Simulation App</h1>
      <nav>
        <Link to="/phishing">Phishing Simulation</Link> | <Link to="/attempts">Attempts</Link>
      </nav>
    </div>
  );
};
