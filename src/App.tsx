import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage';
import VaultPage from './VaultPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/vault.html" element={<VaultPage />} />
      {/* Fallback for /vault without .html if needed */}
      <Route path="/vault" element={<VaultPage />} />
    </Routes>
  );
}
