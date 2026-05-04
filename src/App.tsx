import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './LandingPage';
import VaultPage from './VaultPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/vault" element={<VaultPage />} />
      <Route path="/vault.html" element={<Navigate to="/vault" replace />} />
    </Routes>
  );
}
