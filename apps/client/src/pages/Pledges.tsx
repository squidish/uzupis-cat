import CRTFrame from '../components/CRTFrame';
import ThemeToggle from '../components/ThemeToggle';
import Nav from '../components/Nav';

export default function Pledges() {
  return (
    <CRTFrame>
      <Nav />
      <h1 className="crt-glow text-2xl">Pledges - Coming soon</h1>
      <ThemeToggle className="absolute top-4 right-4" />
    </CRTFrame>
  );
}
