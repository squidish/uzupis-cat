import { Route, Routes, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Home from './pages/Home';
import Constitution from './pages/Constitution';
import Pledges from './pages/Pledges';

export default function App() {
  const location = useLocation();

  useEffect(() => {
    // Send focus to page heading when navigating for screen reader context
    const heading = document.getElementById('main-heading');
    heading?.focus();
  }, [location.pathname]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/constitution" element={<Constitution />} />
      <Route path="/pledges" element={<Pledges />} />
    </Routes>
  );
}
