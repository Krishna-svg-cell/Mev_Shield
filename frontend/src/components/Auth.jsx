import React, { useState } from 'react';
import axios from 'axios';

const Auth = ({ onLogin }) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { pin });
      if (res.data.success) {
        onLogin();
      }
    } catch (err) {
      setError("ACCESS DENIED: Invalid Security PIN");
    }
  };

  return (
    <div className="auth-wrapper">
      <h1 className="logo" style={{ fontSize: '3rem', marginBottom: '40px' }}>MEV SHIELD</h1>
      <div className="card" style={{ textAlign: 'center' }}>
        <h2>SECURITY CHECK</h2>
        <p style={{ color: '#aaa' }}>Enter 4-Digit Access PIN</p>
        <input 
          type="password" 
          className="pin-input" 
          maxLength="4"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
        />
        <br />
        <button className="enter-btn" onClick={handleLogin}>UNLOCK SYSTEM</button>
        {error && <p style={{ color: 'red', marginTop: '15px' }}>{error}</p>}
      </div>
    </div>
  );
};

export default Auth;