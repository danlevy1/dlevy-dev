import { useId } from 'react';
import { css, cx } from 'styled-system/css';

interface LogoProps {
  className?: string;
}

/**
 * The "./D" mark, drawn inline so its colors follow the site theme and the
 * terminal dot can blink like a cursor. Pure CSS animation: ships no JS.
 * Static versions for other uses live in /public/logo-{light,dark}.svg.
 */
export const Logo = ({ className }: LogoProps) => {
  // Unique ids so the gradient/mask never collide if the logo appears twice.
  const id = useId().replace(/:/g, '');
  const fillId = `${id}-fill`;
  const maskId = `${id}-cutout`;

  return (
    <svg
      viewBox="0 0 132 100"
      role="img"
      aria-label="dlevy.dev"
      className={cx(css({ h: '9', w: 'auto', display: 'block' }), className)}
    >
      <defs>
        <linearGradient id={fillId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: 'var(--colors-logo-from)' }} />
          <stop offset="100%" style={{ stopColor: 'var(--colors-logo-to)' }} />
        </linearGradient>
        <mask id={maskId}>
          <rect width="100%" height="100%" fill="#fff" />
          <path
            d="M 80 38 L 90.5 46.5 Q 95 50, 90.5 53.5 L 80 62"
            fill="none"
            stroke="#000"
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </mask>
      </defs>

      {/* Terminal dot: slowly fades in and out like a soft cursor blink. */}
      <rect
        x="14"
        y="67"
        width="13"
        height="13"
        rx="4"
        className={css({
          fill: 'logo.dot',
          animation: 'cursorBlink 1.8s ease-in-out infinite',
          '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
        })}
      />

      {/* Terminal slash. */}
      <line
        x1="36"
        y1="78"
        x2="52"
        y2="22"
        strokeWidth="7"
        strokeLinecap="round"
        className={css({ stroke: 'logo.slash' })}
      />

      {/* Gradient "D" with the rounded chevron cut out. */}
      <path
        d="M 70 20 H 88 C 106 20, 116 33, 116 50 C 116 67, 106 80, 88 80 H 70 C 67.8 80, 66 78.2, 66 76 V 24 C 66 21.8, 67.8 20, 70 20 Z"
        fill={`url(#${fillId})`}
        mask={`url(#${maskId})`}
      />
    </svg>
  );
};
