import type { ReactNode } from 'react';
import { css } from 'styled-system/css';

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
      <a
        href="/"
        className={css({
          fontWeight: 'semibold',
          color: 'fg',
          textDecoration: 'none',
          letterSpacing: '-0.01em',
        })}
      >
        dlevy.dev
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
        {children}
      </nav>
    </header>
  );
};
