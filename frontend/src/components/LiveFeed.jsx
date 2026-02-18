import React, { useState, useEffect } from 'react';

const LiveFeed = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const attacks = ['Sandwich Attack', 'Front-Run', 'Liquidity Snipe'];
      const tokens = ['PEPE', 'ETH', 'SOL', 'WIF', 'BONK'];
      
      const newLog = {
        time: new Date().toLocaleTimeString(),
        type: attacks[Math.floor(Math.random() * attacks.length)],
        token: tokens[Math.floor(Math.random() * tokens.length)],
        attacker: '0x' + Math.random().toString(16).substr(2, 4) + '...'
      };

      setLogs(prev => [newLog, ...prev].slice(0, 10)); 
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="card">
      <h2>⚡ Global Attack Feed</h2>
      <div className="feed-list">
        {logs.map((log, i) => (
          <div key={i} className="feed-item">
            <span style={{ color: '#aaa' }}>[{log.time}]</span>{' '}
            <span className="feed-attack">{log.type}</span> detected on{' '}
            <strong style={{ color: 'white' }}>{log.token}</strong> by {log.attacker}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LiveFeed;