# dlevy-dev

Personal website at [dlevy.dev](https://dlevy.dev).

**Stack:** [Astro](https://astro.build) · [React](https://react.dev) islands · TypeScript · [PandaCSS](https://panda-css.com) · pnpm · GitHub Pages

## Development

Requires the Node version in `.nvmrc` and pnpm.

```bash
pnpm install    # also runs `panda codegen` to generate styled-system/
pnpm dev        # http://localhost:4321
pnpm build      # type-check (astro check) + static build to dist/
pnpm preview    # serve dist/ locally
```

## Structure

- `src/pages/` — routes (`index`, `projects`, `about`)
- `src/content/projects/` — one Markdown file per project (schema in `src/content.config.ts`)
- `src/components/` — Astro components and React islands (`ThemeToggle.tsx`)
- `panda.config.ts` — design tokens and dark-mode semantic colors
- `public/CNAME` — custom domain, copied into the build

## Deployment

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds the site and deploys it to GitHub Pages.
In the repo's **Settings → Pages**, set **Source** to **GitHub Actions**.
