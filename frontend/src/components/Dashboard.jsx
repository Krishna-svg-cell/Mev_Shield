import React, { useState } from 'react';
import axios from 'axios';
import { ShieldAlert, ShieldCheck } from 'lucide-react';
import LiveFeed from './LiveFeed';

const Dashboard = () => {
  const [formData, setFormData] = useState({ stock: 'ETH', quantity: 1, action: 'Buy', isPrivate: false });
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyzeTrade = async () => {
    setLoading(true);
    setAnalysis(null);
    try {
      const res = await axios.post('http://localhost:5000/api/analyze', formData);
      setAnalysis(res.data);
    } catch (err) {
      alert("AI Service Offline");
    }
    setLoading(false);
  };

  const confirmTrade = async () => {
    try {
      await axios.post('http://localhost:5000/api/trade', { ...formData, ...analysis });
      alert("Trade Executed Securely & Logged.");
      setAnalysis(null);
    } catch (err) {
      alert("Trade Failed");
    }
  };

  return (
    <div className="grid-container">
      {/* LEFT: TRADING MODULE */}
      <div className="card">
        <h2>🛡️ Secure Trade Terminal</h2>
        
        <label>Asset Symbol</label>
        <input type="text" value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})} />
        
        <div style={{ display: 'flex', gap: '10px' }}>
          <div style={{ flex: 1 }}>
            <label>Action</label>
            <select value={formData.action} onChange={e => setFormData({...formData, action: e.target.value})}>
              <option>Buy</option>
              <option>Sell</option>
            </select>
          </div>
          <div style={{ flex: 1 }}>
            <label>Quantity</label>
            <input type="number" value={formData.quantity} onChange={e => setFormData({...formData, quantity: e.target.value})} />
          </div>
        </div>

        <div style={{ marginTop: '15px', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
          <input 
            type="checkbox" 
            style={{ width: '20px' }} 
            checked={formData.isPrivate} 
            onChange={e => setFormData({...formData, isPrivate: e.target.checked})} 
          />
          <span style={{ color: formData.isPrivate ? '#00FFC0' : '#888' }}>
            Enable <b>Private Mempool Relay</b> (Flashbots)
          </span>
        </div>

        <button className="btn-action" onClick={analyzeTrade} disabled={loading}>
          {loading ? "AI AGENT SCANNING..." : "SCAN FOR RISKS"}
        </button>

        {/* RISK RESULT */}
        {analysis && (
          <div className={`risk-alert risk-${analysis.riskLevel}`}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.2rem', fontWeight: 'bold' }}>
              {analysis.riskLevel === 'SAFE' ? <ShieldCheck /> : <ShieldAlert />}
              RISK: {analysis.riskLevel}
            </div>
            <p style={{ margin: '10px 0' }}>{analysis.analysis}</p>
            <p>Estimated Slippage: <strong>{analysis.slippage}%</strong></p>
            
            <button className="btn-action" 
              style={{ background: analysis.riskLevel === 'CRITICAL' ? '#FF4400' : '#00FFC0', color: analysis.riskLevel === 'CRITICAL' ? '#fff' : '#000' }}
              onClick={confirmTrade}
            >
              {analysis.riskLevel === 'CRITICAL' ? 'PROCEED ANYWAY (UNSAFE)' : 'CONFIRM SECURE TRADE'}
            </button>
          </div>
        )}
      </div>

      {/* RIGHT: LIVE FEED */}
      <LiveFeed />
    </div>
  );
};

export default Dashboard;