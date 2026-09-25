import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [dark, setDark] = useState(() => localStorage.getItem('hiumanlab-theme') === 'dark');
  useEffect(() => {
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
    localStorage.setItem('hiumanlab-theme', dark ? 'dark' : 'light');
  }, [dark]);
  return <button className="theme-toggle" onClick={() => setDark(value => !value)} aria-label={`Switch to ${dark ? 'light' : 'dark'} mode`} title={`Switch to ${dark ? 'light' : 'dark'} mode`}><span>{dark ? '☼' : '☾'}</span><span className="theme-label">{dark ? 'Light mode' : 'Dark mode'}</span></button>;
}
