import { useCallback, useEffect, useRef, useState } from 'react';
import CRTFrame from '../components/CRTFrame';
import RetroButton from '../components/RetroButton';
import ThemeToggle from '../components/ThemeToggle';
import PixelCat from '../components/PixelCat';
import Toast from '../components/Toast';
import Nav from '../components/Nav';
import LanguageToggle from '../components/LanguageToggle';
import { useI18n } from '../i18n';

const KONAMI = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
];

export default function Home() {
  const [visitCount, setVisitCount] = useState<number | null>(null);
  const [scratchTrigger, setScratchTrigger] = useState(0);
  const [toast, setToast] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<string | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const konamiIndex = useRef(0);
  const { t } = useI18n();

  useEffect(() => {
    const fetchVisits = async () => {
      const res = await fetch('/api/visits');
      const data = (await res.json()) as { total: number };
      setVisitCount(data.total);
    };
    void fetchVisits();
  }, []);

  const chime = useCallback(() => {
    const ctx = audioCtxRef.current ?? new AudioContext();
    audioCtxRef.current = ctx;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, ctx.currentTime);
    osc.connect(gain);
    gain.connect(ctx.destination);
    gain.gain.setValueAtTime(0.001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.2, ctx.currentTime + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1);
    osc.start();
    osc.stop(ctx.currentTime + 1);
  }, []);

  const scratch = useCallback(
    (showToast = true) => {
      setScratchTrigger((c) => c + 1);
      chime();
      if (showToast) {
        setToast(t('home.toast'));
      }
    },
    [chime, t],
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (key === 's') {
        scratch(false);
        setTooltip(t('home.tooltip'));
        setTimeout(() => setTooltip(null), 2000);
        return;
      }
      if (key === KONAMI[konamiIndex.current]?.toLowerCase()) {
        konamiIndex.current += 1;
        if (konamiIndex.current === KONAMI.length) {
          window.dispatchEvent(new Event('toggle-theme'));
          konamiIndex.current = 0;
        }
      } else {
        konamiIndex.current = key === KONAMI[0].toLowerCase() ? 1 : 0;
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [scratch]);

  return (
    <CRTFrame>
      <Nav />
      <h1 className="crt-glow text-2xl">{t('home.title')}</h1>
      <div className="absolute top-4 right-4 flex gap-2">
        <LanguageToggle />
        <ThemeToggle />
      </div>
      {visitCount !== null && <p className="mt-4">Visitor #{visitCount}</p>}
      <div className="relative">
        <PixelCat scratchTrigger={scratchTrigger} />
        {tooltip && <div className="tooltip">{tooltip}</div>}
      </div>
      <RetroButton onClick={() => scratch()} className="mt-4">
        {t('home.button')}
      </RetroButton>
      {toast && <Toast message={toast} />}
    </CRTFrame>
  );
}
