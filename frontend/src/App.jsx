import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Auth from './components/Auth';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import History from './components/History';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <BrowserRouter>
      {isAuthenticated ? (
        <div className="app-container">
          <Navbar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/history" element={<History />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      ) : (
        <Auth onLogin={() => setIsAuthenticated(true)} />
      )}
    </BrowserRouter>
  );
}

export default App;