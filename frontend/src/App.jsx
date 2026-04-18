import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import Map from './pages/Map';
import Assistant from './pages/Assistant';
import Queues from './pages/Queues';
import Community from './pages/Community';

// Placeholder for other routes
const Placeholder = ({ title }) => (
  <div className="flex h-full items-center justify-center p-8">
    <div className="text-center max-w-md">
      <div className="w-16 h-16 border-2 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-6"></div>
      <h2 className="font-headline text-xl text-primary font-bold tracking-widest uppercase mb-2">{title}</h2>
      <p className="font-mono text-xs text-on-surface-variant">Module currently under development or awaiting sensor integration.</p>
    </div>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Map />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="queues" element={<Queues />} />
          <Route path="assistant" element={<Assistant />} />
          <Route path="community" element={<Community />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
