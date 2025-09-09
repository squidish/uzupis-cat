import { Link } from 'react-router-dom';
import { useI18n } from '../i18n';

export default function Nav() {
  const { t } = useI18n();
  return (
    <nav aria-label="Main navigation" className="absolute left-4 top-4">
      <ul className="flex gap-2">
        <li>
          <Link to="/" className="retro-btn">
            {t('nav.home')}
          </Link>
        </li>
        <li>
          <Link to="/constitution" className="retro-btn">
            {t('nav.constitution')}
          </Link>
        </li>
        <li>
          <Link to="/pledges" className="retro-btn">
            {t('nav.pledges')}
          </Link>
        </li>
      </ul>
    </nav>
  );
}
