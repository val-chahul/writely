'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // After mounting, we can show the themed icon
  useEffect(() => setMounted(true), []);

  // Ensure consistent server/client icon
  const IconToShow = () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-6 h-6 text-slate-600 dark:text-slate-400"
    >
      <path
        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
        stroke="currentColor"
        className={mounted && theme === 'dark' ? 'hidden' : 'block'}
      />
      <path
        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
        stroke="currentColor"
        className={mounted && theme === 'dark' ? 'block' : 'hidden'}
      />
    </svg>
  );

  return (
    <button
      onClick={() => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        console.log('Setting theme to:', newTheme);
        setTheme(newTheme);
      }}
      className="fixed top-6 right-6 z-50 p-2.5 rounded-lg 
        bg-white/90 dark:bg-slate-950/90
        border border-slate-200/50 dark:border-slate-800/50 
        shadow-lg hover:shadow-xl backdrop-blur-lg"
    >
      <IconToShow />
    </button>
  );
}
