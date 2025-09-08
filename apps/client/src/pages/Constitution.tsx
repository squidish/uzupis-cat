import { Link } from 'react-router-dom';
import CRTFrame from '../components/CRTFrame';
import ThemeToggle from '../components/ThemeToggle';
import Nav from '../components/Nav';

export default function Constitution() {
  return (
    <CRTFrame>
      <Nav />
      <ThemeToggle className="absolute top-4 right-4" />
      <main className="printer-paper">
        <h1 className="crt-glow mb-4 text-xl">Gentle Ideals</h1>
        <ul className="list-disc space-y-2 pl-6">
          <li>Everyone may dream kindly.</li>
          <li>A passer-by may pause and smile.</li>
          <li>A cat may help in difficult moments.</li>
        </ul>
        <Link to="/" className="retro-btn mt-6 inline-block">
          Back Home
        </Link>
      </main>
    </CRTFrame>
  );
}
