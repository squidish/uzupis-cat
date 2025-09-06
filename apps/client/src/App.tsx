import CRTFrame from './components/CRTFrame';
import ThemeToggle from './components/ThemeToggle';

export default function App() {
  return (
    <CRTFrame>
      <h1 className="crt-glow text-2xl">Užupis Cat — Retro Tribute</h1>
      <ThemeToggle className="absolute top-4 right-4" />
    </CRTFrame>
  );
}
