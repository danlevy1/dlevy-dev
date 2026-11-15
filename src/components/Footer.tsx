import { css } from 'styled-system/css';

/** Rendered to static HTML at build time; ships no JavaScript. */
export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer
      className={css({
        py: '8',
        borderTopWidth: '1px',
        borderColor: 'border',
        fontSize: 'sm',
        color: 'muted',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '4',
        justifyContent: 'space-between',
      })}
    >
      <span>© {year} Dan Levy</span>
      <span className={css({ display: 'flex', gap: '4' })}>
        <a href="https://github.com/danlevy1">GitHub</a>
        <a href="https://linkedin.com/in/danlevy124">LinkedIn</a>
      </span>
    </footer>
  );
};
