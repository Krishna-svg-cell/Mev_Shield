import React from 'react';
import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <Shield color="#00FFC0" size={32} />
        <span className="logo">MEV SHIELD</span>
      </div>
      <div className="nav-links">
        <Link to="/">Dashboard</Link>
        <Link to="/history">Trade History</Link>
        <span style={{ color: '#00FFFF', border: '1px solid cyan', padding: '5px 10px', borderRadius: '5px', marginLeft: '20px' }}>
          SECURE CONNECTION
        </span>
      </div>
    </nav>
  );
};

export default Navbar;