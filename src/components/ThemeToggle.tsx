'use client';

import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { useTheme } from '@/app/providers';
import { CSSProperties } from 'react';

export default function ThemeToggle({ 
  className = '', 
  style 
}: { 
  className?: string;
  style?: CSSProperties;
}) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`w-9 h-9 flex items-center justify-center transition-colors duration-200 border-0 shadow-none ${className}`}
      style={style}
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <MoonIcon className="w-6 h-6" />
      ) : (
        <SunIcon className="w-6 h-6" />
      )}
    </button>
  );
} 