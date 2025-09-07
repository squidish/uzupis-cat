import { useEffect, useState } from 'react';
import CRTFrame from './components/CRTFrame';
import ThemeToggle from './components/ThemeToggle';

export default function App() {
  const [visitCount, setVisitCount] = useState<number | null>(null);

  useEffect(() => {
    const fetchVisits = async () => {
      const res = await fetch('/api/visits');
      const data = (await res.json()) as { total: number };
      setVisitCount(data.total);
    };
    void fetchVisits();
  }, []);

  return (
    <CRTFrame>
      <h1 className="crt-glow text-2xl">Užupis Cat — Retro Tribute</h1>
      <ThemeToggle className="absolute top-4 right-4" />
      {visitCount !== null && <p className="mt-4">Visitor #{visitCount}</p>}
    </CRTFrame>
  );
}
