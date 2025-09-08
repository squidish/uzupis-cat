import { Link } from 'react-router-dom';

export default function Nav() {
  return (
    <nav aria-label="Main navigation" className="absolute left-4 top-4">
      <ul className="flex gap-2">
        <li>
          <Link to="/" className="retro-btn">
            Home
          </Link>
        </li>
        <li>
          <Link to="/constitution" className="retro-btn">
            Constitution
          </Link>
        </li>
        <li>
          <Link to="/pledges" className="retro-btn">
            Pledges
          </Link>
        </li>
      </ul>
    </nav>
  );
}
