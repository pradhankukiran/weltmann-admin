import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Overview from './pages/Overview';
import Analytics from './pages/Analytics';
import KnowledgeBase from './pages/KnowledgeBase';
import Agents from './pages/Agents';
import Call from './pages/Call';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/overview" element={<Overview />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/knowledge-base" element={<KnowledgeBase />} />
          <Route path="/agents" element={<Agents />} />
          <Route path="/call" element={<Call />} />
          <Route path="/" element={<Navigate to="/overview" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;