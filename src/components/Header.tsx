import type { ReactNode } from 'react';
import { css } from 'styled-system/css';
import { Logo } from './Logo';

const links = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/about', label: 'About' },
];

interface HeaderProps {
  /** Current URL path, used to highlight the active nav link. */
  currentPath: string;
  /** Extra nav content, e.g. the hydrated ThemeToggle island. */
  children?: ReactNode;
}

/** Rendered to static HTML at build time; ships no JavaScript on its own. */
export const Header = ({ currentPath, children }: HeaderProps) => {
  const current = currentPath.replace(/\/$/, '') || '/';

  return (
    <header
      className={css({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        py: '5',
        borderBottomWidth: '1px',
        borderColor: 'border',
      })}
    >
      <a href="/" aria-label="dlevy.dev home" className={css({ display: 'inline-flex', rounded: 'sm' })}>
        <Logo />
      </a>
      <nav className={css({ display: 'flex', alignItems: 'center', gap: { base: '3', sm: '5' } })}>
        {links.map(({ href, label }) => (
          <a
            key={href}
            href={href}
            aria-current={current === href ? 'page' : undefined}
            className={css({
              fontSize: 'sm',
              color: 'muted',
              textDecoration: 'none',
              _hover: { color: 'fg' },
              '&[aria-current=page]': { color: 'fg', fontWeight: 'medium' },
            })}
          >
            {label}
          </a>
        ))}
        <a
          href="https://linkedin.com/in/danlevy124"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Dan Levy on LinkedIn (opens in a new tab)"
          title="LinkedIn"
          className={css({
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            w: '9',
            h: '9',
            rounded: 'md',
            borderWidth: '1px',
            borderColor: 'border',
            // LinkedIn brand blue; the lighter tint keeps contrast on dark backgrounds.
            color: '#0A66C2',
            _dark: { color: '#70B5F9' },
            transition: 'background 0.15s',
            _hover: { bg: 'surface' },
          })}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
          </svg>
        </a>
        {children}
      </nav>
    </header>
  );
};
