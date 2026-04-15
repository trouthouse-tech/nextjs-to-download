# Architecture Documentation

This folder contains Architecture Decision Records (ADRs) for the **google-maps-scraper-web** Next.js codebase. Each ADR documents a decision, why it was made, and how to apply it consistently.

## Why ADRs?

ADRs keep implementation consistent across the project by documenting:

- **What** standard we follow
- **Why** we chose it
- **How** to apply it in everyday development

## ADR index (on-disk)

1. [001 – Redux patterns](./001-redux-patterns.md) — Redux Toolkit slices, store wiring, and usage in the app.
2. [002 – Component composition](./002-component-composition.md) — Component boundaries and composition rules.
3. [003 – Styling rules](./003-styling-rules.md) — Tailwind and global CSS conventions.
4. [004 – API integration](./004-api-integration.md) — API clients, typing, and separation from UI.
5. [005 – File organization](./005-file-organization.md) — Canonical `src/` layout (`packages/`, `api/`, etc.).
6. [006 – Constants and utilities](./006-constants-utilities.md) — Shared constants and pure utilities.

## How to use

1. Open the ADR most relevant to your feature.
2. Follow the approved patterns in implementation.
3. Add new ADRs here whenever architectural decisions change—and **update this index** when you do.
