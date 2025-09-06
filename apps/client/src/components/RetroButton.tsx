import { ButtonHTMLAttributes } from 'react';

export default function RetroButton({ className = '', ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`retro-btn ${className}`.trim()}
    />
  );
}
