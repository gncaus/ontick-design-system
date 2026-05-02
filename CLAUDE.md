# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start Vite dev server
npm run build     # Type-check (vue-tsc) then bundle (vite build)
npm run preview   # Preview the production build
```

No test runner or linter is currently configured.

## Stack

- **Vue 3** + **TypeScript 5.9** (strict mode) + **Vite 7**
- **Tailwind CSS v4** via `@tailwindcss/postcss`
- **tailwind-variants** (`tv`) for type-safe component variant definitions
- **tailwind-merge** for resolving conflicting utility classes at runtime

## Architecture

This is an early-stage Vue 3 component library / design system. Components live in `src/components/<ComponentName>/` with a `<ComponentName>.vue` file and an `index.ts` barrel export. The entry point `src/App.vue` is used to preview components during development — it is not the library entry.

### Tailwind setup

All Tailwind utilities carry the `ds-` prefix (configured in `tailwind.config.js`) to prevent collisions when the library is consumed by host apps. Always use the prefix: `ds-flex`, `ds-text-sm`, etc.

The design-token color palette is defined in `src/style.css` using Tailwind v4's `@theme` block. It includes 14 color families, each with 10 shades:

`ontick-lime`, `ontick-prussian`, `ontick-teal`, `ontick-pink`, `ontick-purple`, `ontick-orange`, `ontick-yellow`, `ontick-blue`, `ontick-green`, `ontick-red`, `ontick-steel`, `ontick-graphite`, `ontick-carbon`

### Component variants pattern

Components use `tailwind-variants` (`tv`) to define their variants. See [src/components/Input/Input.vue](src/components/Input/Input.vue) for the canonical example. Variant keys map to named states (`default`, `filled`, `disabled`, `error`, etc.) and are passed as props.

### TypeScript

`tsconfig.app.json` enables `strict: true`, `noUnusedLocals`, `noUnusedParameters`, and `noFallthroughCasesInSwitch`. All code must satisfy these constraints.
