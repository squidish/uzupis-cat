import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Constitution from './pages/Constitution';
import Pledges from './pages/Pledges';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/constitution" element={<Constitution />} />
      <Route path="/pledges" element={<Pledges />} />
    </Routes>
  );
}
