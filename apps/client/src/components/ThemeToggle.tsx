import { useEffect, useState } from 'react';
import RetroButton from './RetroButton';
import Toast from './Toast';

const STORAGE_KEY = 'retro-theme';

type Theme = 'day' | 'night';

interface Props {
  className?: string;
}

export default function ThemeToggle({ className = '' }: Props) {
  const [theme, setTheme] = useState<Theme>('day');
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY) as Theme | null;
    if (stored) {
      setTheme(stored);
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    window.localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const toggle = () => {
    const next = theme === 'day' ? 'night' : 'day';
    setTheme(next);
    setToast(`${next === 'day' ? 'Day' : 'Night'} mode`);
  };

  return (
    <>
      <RetroButton onClick={toggle} aria-label="Toggle theme" className={className}>
        {theme === 'day' ? 'Night' : 'Day'}
      </RetroButton>
      {toast && <Toast message={toast} />}
    </>
  );
}
