import { defineConfig } from '@pandacss/dev';

export default defineConfig({
  presets: ['@pandacss/preset-base', '@pandacss/preset-panda'],
  preflight: true,
  jsxFramework: 'react',
  include: ['./src/**/*.{ts,tsx,js,jsx,astro}'],
  exclude: [],
  outdir: 'styled-system',

  // Dark mode follows `data-theme="dark"` on <html>, set by ThemeToggle.
  conditions: {
    extend: {
      dark: '[data-theme=dark] &',
      light: '[data-theme=light] &',
    },
  },

  globalCss: {
    'html, body': {
      bg: 'bg',
      color: 'fg',
      fontFamily: 'body',
      lineHeight: '1.6',
      WebkitFontSmoothing: 'antialiased',
    },
    a: { color: 'accent', textUnderlineOffset: '3px' },
    '::selection': { bg: 'accent', color: 'bg' },
  },

  theme: {
    extend: {
      keyframes: {
        // Soft cursor blink for the logo dot: holds briefly at each end, fades between.
        cursorBlink: {
          '0%, 15%, 100%': { opacity: '1' },
          '50%, 65%': { opacity: '0' },
        },
      },
      tokens: {
        fonts: {
          body: { value: 'Inter, ui-sans-serif, system-ui, -apple-system, sans-serif' },
          mono: { value: 'ui-monospace, SFMono-Regular, Menlo, monospace' },
        },
      },
      semanticTokens: {
        colors: {
          bg: { value: { base: '{colors.white}', _dark: '{colors.zinc.950}' } },
          surface: { value: { base: '{colors.zinc.50}', _dark: '{colors.zinc.900}' } },
          border: { value: { base: '{colors.zinc.200}', _dark: '{colors.zinc.800}' } },
          fg: { value: { base: '{colors.zinc.900}', _dark: '{colors.zinc.100}' } },
          muted: { value: { base: '{colors.zinc.600}', _dark: '{colors.zinc.400}' } },
          accent: { value: { base: '{colors.indigo.600}', _dark: '{colors.indigo.400}' } },
          // Logo: deeper tones on light backgrounds, the original brighter ones on dark.
          logo: {
            dot: { value: { base: '{colors.sky.500}', _dark: '{colors.sky.400}' } },
            slash: { value: { base: '{colors.slate.500}', _dark: '{colors.slate.400}' } },
            from: { value: { base: '{colors.sky.500}', _dark: '{colors.sky.400}' } },
            to: { value: { base: '{colors.indigo.600}', _dark: '{colors.indigo.500}' } },
          },
        },
      },
    },
  },
});
