import { useEffect, useState } from 'react';
import { css } from 'styled-system/css';

type Theme = 'light' | 'dark';

const STORAGE_KEY = 'theme';
const darkQuery = () => matchMedia('(prefers-color-scheme: dark)');
const osTheme = (): Theme => (darkQuery().matches ? 'dark' : 'light');

const readStored = (): Theme | null => {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === 'light' || value === 'dark' ? value : null;
  } catch {
    return null;
  }
};

const applyTheme = (theme: Theme) => {
  document.documentElement.dataset.theme = theme;
};

/**
 * React island: switches `data-theme` on <html>.
 *
 * Follows the OS light/dark preference (live, including changes while the page
 * is open) until the visitor picks the opposite theme. Picking the theme that
 * matches the OS again clears the override, so the site goes back to following it.
 */
export const ThemeToggle = () => {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light');

    const query = darkQuery();
    const onOsChange = () => {
      if (readStored() !== null) return; // Visitor's explicit choice wins.
      const next = osTheme();
      applyTheme(next);
      setTheme(next);
    };
    query.addEventListener('change', onOsChange);
    return () => query.removeEventListener('change', onOsChange);
  }, []);

  const toggle = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    try {
      if (next === osTheme()) localStorage.removeItem(STORAGE_KEY);
      else localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Storage can be blocked (private mode); the toggle still works for this visit.
    }
    setTheme(next);
  };

  const label = theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme';

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className={css({
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        w: '9',
        h: '9',
        rounded: 'md',
        borderWidth: '1px',
        borderColor: 'border',
        color: 'fg',
        cursor: 'pointer',
        transition: 'background 0.15s',
        _hover: { bg: 'surface' },
      })}
    >
      {/* Render nothing until mounted so the server HTML never shows the wrong icon. */}
      {theme === null ? null : theme === 'dark' ? <SunIcon /> : <MoonIcon />}
    </button>
  );
};

const SunIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
  </svg>
);

const MoonIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);
