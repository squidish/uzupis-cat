import { useEffect, useRef } from 'react';

interface PixelCatProps {
  scratchTrigger: number;
}

export default function PixelCat({ scratchTrigger }: PixelCatProps) {
  const earRef = useRef<SVGRectElement>(null);

  useEffect(() => {
    const ear = earRef.current;
    if (!ear) return;
    ear.classList.add('shake');
    const handle = () => ear.classList.remove('shake');
    ear.addEventListener('animationend', handle, { once: true });
    return () => ear.removeEventListener('animationend', handle);
  }, [scratchTrigger]);

  return (
    <svg
      className="pixel-cat mx-auto mt-4"
      width={64}
      height={64}
      viewBox="0 0 32 32"
      aria-label="Pixel cat"
    >
      <rect x="8" y="8" width="16" height="16" fill="currentColor" />
      <rect
        ref={earRef}
        className="ear"
        x="20"
        y="0"
        width="8"
        height="8"
        fill="currentColor"
      />
    </svg>
  );
}
