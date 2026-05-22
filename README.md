<p align="center">
  <a href="https://luckeeapp.com" title="Luckee — visit luckeeapp.com">
    <img src="./public/logo.svg" alt="Luckee logo" width="72" height="72" />
  </a>
</p>

<p align="center">
  <strong>Sponsored by <a href="https://luckeeapp.com">Luckee</a></strong><br />
  <sub>Open-source tools from the Luckee team. Use the full product at <a href="https://luckeeapp.com">luckeeapp.com</a>.</sub>
</p>

---

# nextjs-to-download

Next.js app that **compiles TSX in the browser**, shows a **live iframe preview** at each graphic’s **canvas size** (you pick dimensions or a preset when creating the graphic), and lets you **save a draft** and **download a PNG** (or print / Save as PDF). **No Express server**: `src/api` modules are **thin wrappers over `localStorage`**.

**Open source (MIT).** All state stays in the visitor’s browser; production is just static/SSR assets and the JS bundle.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3064](http://localhost:3064). On **localhost** (and `127.0.0.1` / `*.localhost`), a one-time welcome explains storage and security; dismiss permanently or until you close the tab—clearing site data shows it again.

Create a graphic, then open **Studio** from the list (`/studio`).

## Persistence

- Graphics (title, metadata including `studioDraft.tsx`) are stored under the key **`nextjs-to-download:image-graphics:v1`** in `localStorage`.
- Export `getStorageKeyForDocs` from `@/api/image-creation-studio` if you need the key in docs or tooling.

## API layer

- **`src/api/config.ts`** — `API_BASE_URL` defaults to `http://127.0.0.1:3064` (same default port as `npm run dev`) for optional future localhost services; **nothing in the default app calls it**.
- **`src/api/image-creation-studio/*`** — same function names as a typical HTTP client (`listImageGraphicsApi`, `createImageGraphicApi`, `patchImageGraphicStudioDraft`, etc.), implemented with **read/write of the vault above**. There is **no** chat, ledger, or LLM exchange layer in this repo.

## Redux

Thunks in `src/store/thunks/image-creation-studio/` call those API wrappers and return `200 | 400 | 500` like the Luckee pattern.

## Security

TSX preview **executes compiled JavaScript** in an iframe. Treat pasted or model-generated TSX as **trusted input** only. **Canonical in-app guide:** open **`/docs/security/tsx-preview`** on the deployed or local site (also see `docs/tsx-live-preview-security.md` in the repo).

## Documentation (site)

In-app guides live under **`/docs`** (static TSX, ships with the deploy). Repo `docs/*.md` files can stay as drafts or mirrors.

## Layout

- `src/app` — `/` list, `/studio` editor (wrapped by `AppShell` + **Luckee-style sidebar** in root layout)
- `src/components/sidebar` — collapsible rail: **Graphics** (home + studio) and **Docs** (`/docs`)
- `src/packages/graphics-studio` — studio UI
- `src/packages/graphics` — home list, `header/` (list chrome + create modal)
- `src/store` — Redux slices + thunks
- `src/utils/image-creation-studio` — Babel compile + iframe `srcDoc` builder
