import React, { useEffect, useState, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { initAnalytics, auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import MainLayout from './layouts/MainLayout';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const Map = lazy(() => import('./pages/Map'));
const Assistant = lazy(() => import('./pages/Assistant'));
const Queues = lazy(() => import('./pages/Queues'));
const Community = lazy(() => import('./pages/Community'));

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
  const [user, setUser] = useState(null);

  useEffect(() => {
    initAnalytics();
    
    // Google Services: Authentication
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <BrowserRouter>
      <Suspense fallback={<Placeholder title="Loading Module..." />}>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Map />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="queues" element={<Queues />} />
          <Route path="assistant" element={<Assistant />} />
          <Route path="community" element={<Community />} />
        </Route>
      </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
