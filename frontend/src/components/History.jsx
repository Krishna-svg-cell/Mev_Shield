import React, { useEffect, useState } from 'react';
import axios from 'axios';

const History = () => {
  const [trades, setTrades] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/history').then(res => setTrades(res.data));
  }, []);

  return (
    <div className="card">
      <h2>📜 Transaction History</h2>
      <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ color: '#00FFFF', borderBottom: '1px solid #333' }}>
            <th>Time</th><th>Action</th><th>Asset</th><th>Mode</th><th>Result</th>
          </tr>
        </thead>
        <tbody>
          {trades.map(t => (
            <tr key={t._id} style={{ borderBottom: '1px solid #222' }}>
              <td style={{ padding: '10px' }}>{new Date(t.timestamp).toLocaleTimeString()}</td>
              <td style={{ color: t.action === 'Buy' ? '#00FFC0' : '#FF4400' }}>{t.action}</td>
              <td>{t.quantity} {t.stock}</td>
              <td>{t.isPrivate ? "🔒 Private" : "🌐 Public"}</td>
              <td style={{ color: t.riskLevel === 'CRITICAL' ? 'red' : 'lightgreen' }}>{t.riskLevel}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default History;