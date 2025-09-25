# Cosmic Astrology - Nuxt 4 Showcase

This repository now ships a Nuxt 4 + Vue 3 implementation of the original React landing page. The focus is on reproducing the premium navigation hover pill, the glossy hero typography, and the compatibility grid that assembles itself from left to right when it enters the viewport.

## ✨ Highlights

- **Navigation hover pill** – Dark rose highlight with a centre-out underline animation, perfectly matched to the reference.
- **Hero typography** – Gradient lettering with screen-gloss overlay and supporting pills for CTA states.
- **Astro assembly grid** – Compatibility tiles build sequentially while preserving the glass sheen, hover bloom, and accent glows.
- **Tailwind v4 via `@tailwindcss/vite`** – No Nuxt Tailwind module, tokens delivered via `@theme`.

## 🧰 Stack

- Nuxt 4 + Vue 3 Composition API
- Tailwind CSS v4 (Vite plugin)
- lucide-vue-next icon set
- TypeScript + ESLint flat config

## 🚀 Getting Started

```bash
pnpm install
pnpm dev
```

### Linting & Production

```bash
pnpm lint
pnpm build
```

## 🧪 Demo Notes

The default page (`/`) includes the three showcase elements so reviewers can validate the animations and glossy finish without navigating to additional routes.
