import RetroButton from './RetroButton';
import { useI18n } from '../i18n';

interface Props {
  className?: string;
}

export default function LanguageToggle({ className = '' }: Props) {
  const { lang, setLang } = useI18n();
  const toggle = () => setLang(lang === 'en' ? 'lt' : 'en');
  return (
    <RetroButton onClick={toggle} className={className} aria-label="Toggle language">
      {lang === 'en' ? 'LT' : 'EN'}
    </RetroButton>
  );
}
