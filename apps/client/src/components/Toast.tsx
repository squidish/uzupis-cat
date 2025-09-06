import { useEffect, useState } from 'react';

interface ToastProps {
  message: string;
  duration?: number;
}

export default function Toast({ message, duration = 3000 }: ToastProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setVisible(true);
    const timer = setTimeout(() => setVisible(false), duration);
    return () => clearTimeout(timer);
  }, [message, duration]);

  if (!visible) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-4 right-4 border border-[var(--color-text)] bg-[var(--color-bg)] px-4 py-2 crt-glow"
    >
      {message}
    </div>
  );
}
