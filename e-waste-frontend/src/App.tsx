import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Team from './components/Team';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="nav-container">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/team" className="nav-link">Our Team</Link>
        </nav>
        
        <Routes>
          <Route path="/team" element={<Team />} />
          <Route path="/" element={
            <div className="home-container">
              <h1>Welcome to E-Waste Management</h1>
              <p>Your sustainable solution for electronic waste management</p>
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
