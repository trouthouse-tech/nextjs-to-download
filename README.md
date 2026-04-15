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

Next.js app that **compiles TSX in the browser**, shows a **fixed 16:9 preview** in an iframe, and lets you **save a draft** and **download a PNG** (or print / Save as PDF). **No Express server**: `src/api` modules are **thin wrappers over `localStorage`**.

**Open source (MIT).** All state stays in the visitor’s browser—Vercel only serves static/SSR assets and the JS bundle.

## Deploy to Vercel (no env vars)

1. Push this repo to GitHub (or GitLab / Bitbucket).
2. In [Vercel](https://vercel.com): **Add New… → Project** → import the repo.
3. Leave defaults: **Framework Preset** = Next.js, **Root Directory** = `.`, **Build Command** = `next build`, **Output** = automatic.
4. **Environment Variables**: add none—this project does not read required secrets at build or runtime.
5. Deploy. Optional: set a friendly production domain in Vercel → Project → **Domains**.

`NEXT_PUBLIC_API_BASE_URL` in `src/api/config.ts` is optional and unused by the UI; you can ignore it unless you add a future API.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). On **localhost** (and `127.0.0.1` / `*.localhost`), a one-time welcome explains storage and security; dismiss permanently or until you close the tab—clearing site data shows it again.

Create a graphic, then open **Studio** from the list (`/studio`).

## Persistence

- Graphics (title, metadata including `studioDraft.tsx`) are stored under the key **`nextjs-to-download:image-graphics:v1`** in `localStorage`.
- Export `getStorageKeyForDocs` from `@/api/image-creation-studio` if you need the key in docs or tooling.

## API layer

- **`src/api/config.ts`** — `API_BASE_URL` defaults to `http://127.0.0.1:3000` for optional future localhost services; **nothing in the default app calls it**.
- **`src/api/image-creation-studio/*`** — same function names as a typical HTTP client (`listImageGraphicsApi`, `createImageGraphicApi`, `patchImageGraphicStudioDraft`, etc.), implemented with **read/write of the vault above**. There is **no** chat, ledger, or LLM exchange layer in this repo.

## Redux

Thunks in `src/store/thunks/image-creation-studio/` call those API wrappers and return `200 | 400 | 500` like the Luckee pattern.

## Security

TSX preview **executes compiled JavaScript** in an iframe. See `docs/tsx-live-preview-security.md`. Treat pasted or model-generated TSX as **trusted input** only.

## Brand

- Sidebar / tab icon use **`/public/logo.svg`** (Luckee orange **`#ff7c1e`**).

## Landing page (Lovable / AI builders)

- **Full page** (sticky nav, hero, repo card, features, why, audience, security, MIT — **same section rhythm as Luckee `/icp-studio`**): `docs/lovable-full-landing-prompt.md`
- **Hero-only** (THT + Luckee marketing vibe): `docs/lovable-landing-hero-prompt.md`

## Layout

- `src/app` — `/` list, `/studio` editor (wrapped by `AppShell` + **Luckee-style sidebar** in root layout)
- `src/components/sidebar` — collapsible rail, single **Graphics** item (home + studio both count as active)
- `src/packages/graphics-studio` — studio UI
- `src/packages/graphics` — home list, `header/` (list chrome + create modal)
- `src/store` — Redux slices + thunks
- `src/utils/image-creation-studio` — Babel compile + iframe `srcDoc` builder
