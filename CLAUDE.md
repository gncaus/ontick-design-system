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
- **Pinia** for per-component global stores

## Architecture

Vue 3 component library / design system with an interactive showcase (`src/App.vue`). Components live in `src/components/<ComponentName>/`. The showcase demos live in `src/showcase/demos/`.

### Component folder structure

Every component follows this layout:

```
src/components/ComponentName/
  ComponentName.vue          # visual component
  component-name.variants.ts # tailwind-variants config (UI components)
  component-name.store.ts    # Pinia store (stateful/global components)
  index.ts                   # barrel export
src/showcase/demos/
  ComponentNameDemo.vue      # interactive demo registered in App.vue
```

### Tailwind setup

The `tailwind.config.js` (v3 format) is not loaded by Tailwind v4 — do **not** use the `ds-` prefix. Use standard utility class names.

The design-token color palette is defined in `src/style.css` using Tailwind v4's `@theme` block. 14 color families, each with 10 shades (50–900):

`ontick-lime`, `ontick-prussian`, `ontick-teal`, `ontick-pink`, `ontick-purple`, `ontick-orange`, `ontick-yellow`, `ontick-blue`, `ontick-green`, `ontick-red`, `ontick-steel`, `ontick-graphite`, `ontick-carbon`

### Component variants pattern

UI components (Button, Input…) define all styling in a `*.variants.ts` file using `tv()` from `tailwind-variants`. The component only calls `buttonVariants({ variant, size })` — no style logic in `.vue` files.

For multi-dimension variants (e.g. variant + size), use `compoundVariants` to handle combinations. `tailwind-merge` (bundled in `tailwind-variants`) resolves conflicting classes automatically.

### Global state pattern

Components that need to be triggered from anywhere (Toast, Modal…) use a dedicated Pinia store (`*.store.ts`). The visual component uses `<Teleport to="body">` and is mounted once at the app root. `<style scoped>` must NOT be used on teleported components — use plain `<style>` with specific class names instead.

### TypeScript

`tsconfig.app.json` enables `strict: true`, `noUnusedLocals`, `noUnusedParameters`, and `noFallthroughCasesInSwitch`. All code must satisfy these constraints.

## README maintenance

**Whenever a new component is created, update `README.md`** with a new section under `## Componentes` documenting: import path, all props with types and defaults, available variant/size values, and usage examples. The README is the living documentation for this library.
