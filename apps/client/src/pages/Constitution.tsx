import { Link } from 'react-router-dom';
import CRTFrame from '../components/CRTFrame';
import ThemeToggle from '../components/ThemeToggle';
import Nav from '../components/Nav';
import LanguageToggle from '../components/LanguageToggle';
import { useI18n } from '../i18n';

export default function Constitution() {
  const { t } = useI18n();
  return (
    <CRTFrame>
      <Nav />
      <div className="absolute top-4 right-4 flex gap-2">
        <LanguageToggle />
        <ThemeToggle />
      </div>
      <main className="printer-paper">
        <h1 className="crt-glow mb-4 text-xl">{t('constitution.title')}</h1>
        <ul className="list-disc space-y-2 pl-6">
          {(t('constitution.lines') as string[]).map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
        <Link to="/" className="retro-btn mt-6 inline-block">
          {t('constitution.back')}
        </Link>
      </main>
    </CRTFrame>
  );
}
