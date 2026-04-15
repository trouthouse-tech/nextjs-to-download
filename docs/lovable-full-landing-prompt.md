# Lovable: full marketing landing (ICP-style sections) — **nextjs-to-download**

Long-form landing page prompt for **this repo**: a **client-only** Next.js app where users create **graphics**, write **TSX** in the browser, see a **live iframe preview** (Babel + React UMD + Tailwind CDN), **save drafts** to `localStorage`, and **download a PNG**. **No Express server.** **MIT.**

Structure mirrors the **Luckee marketing `/icp-studio`** landing: sticky nav → hero → repo / get-the-code → “what you get” → “why browser-only” → “who it’s for” → security note → MIT strip.

---

## Where to put it in this repo (you wire the route)

| What | Suggested path |
|------|----------------|
| `metadata` | `src/app/landing/page.tsx` (or your chosen route) — `title` / `description` must match hero copy |
| Page UI | `src/packages/landing/index.tsx` — one client component, same pattern as `src/packages/graphics` |
| Brand | `public/logo.svg` — Luckee orange bolt **`#ff7c1e`** (or use as `<img>`) |

Today **`/`** is the graphics list and **`/studio`** is the editor. Either add **`/landing`** for marketing and keep the app routes, or replace **`/`** with a marketing hero + CTA row that links to **`/graphics`** (you’d move the list). The prompt below does **not** assume you’ve moved routes yet.

Design: **orange accent `#FF7C1E`**, zinc neutrals, `max-w-5xl` content, responsive type — same **feel** as Luckee marketing ICP page, not a purple “AI SaaS” template.

---

## Paste into Lovable

```
Build a single responsive marketing landing page for an open-source Next.js project called **Luckee — Next.js to Preview** (also describable as “nextjs-to-download”): a browser-only **layout lab** for social-sized canvases. Do not scaffold a backend. React + Tailwind. One scrollable page with the sections below (same rhythm as a typical OSS product page: nav → hero → code → features → why → audience → trust → license).

Product facts (use in copy — do not invent a server or accounts):
- TSX is **compiled in the browser** (Babel standalone), preview runs in an **iframe** (`srcDoc`) with Tailwind Play CDN + pinned React UMD for preview.
- **Graphics** (title, canvas size, `metadata.studioDraft` with TSX) persist in **`localStorage`** under a versioned app key — data never leaves the visitor’s device unless they export it.
- Users can **download a PNG** of the preview (and print / save as PDF is fine to mention as optional).
- **Deploy**: static-friendly (e.g. Vercel) with **no required env vars** for the default UI.
- **Security framing**: pasted TSX runs as code in the user’s browser — treat as **trusted input** (no claim of a hardened sandbox).

SEO strings (keep page `metadata` aligned with visible hero):
- Title: **Luckee — NextJS to Preview** (or “Luckee — Next.js to Preview” if you prefer spelling).
- Description: one line each on: browser TSX preview, local saves, PNG export, open source MIT, no backend.

Sections (in order):

1. **Sticky top nav** — Wordmark **Luckee** (links to `/` or `/landing` home), text links: **Open app** → `/` (or `/graphics` if you split routes), **GitHub** → placeholder `https://github.com/OWNER/nextjs-to-download` (user replaces OWNER), optional **Security** → `#security` anchor on this page. Border-bottom, subtle backdrop blur.

2. **Hero** — Eyebrow: **Open source · Runs in your browser** (primary color, small uppercase/mono). **H1**: clear outcome, e.g. **“Design layouts in TSX. Preview live. Export a PNG.”** Lead: 2–3 sentences on TSX + iframe preview + `localStorage` drafts + no server. Subline: **MIT licensed · zero env vars to try the hosted demo** (or similar).

3. **One “Get the code” card** (not two repos — this product is **one repo**): card title **Source code**, short blurb, monospace **clone** row (`git clone https://github.com/OWNER/nextjs-to-download.git`) with **Copy** button + **View on GitHub** primary button. Footnote: **Node 18+**, `npm install` / `npm run dev`, optional `NEXT_PUBLIC_API_BASE_URL` is unused by default UI.

4. **“What you get”** — four feature rows/cards with small primary-tint icon boxes (`lucide-react` icons OK):
   - **Live TSX preview** — Babel in the browser; default export React component; Tailwind classes in preview.
   - **Graphics list + studio** — create canvases (presets for common social sizes), open **Studio** at `/studio`.
   - **Saved drafts** — TSX stored on the graphic in `localStorage`.
   - **PNG export** — capture preview frame; mention iframe / canvas caveats briefly in microcopy if you want honesty.

5. **“Why browser-only”** — three columns: **No backend to run** (static deploy); **Your machine, your data** (localStorage); **Hackable OSS** (fork, extend, MIT).

6. **“Who it’s for”** — two cards: e.g. **Indie hackers & marketers** (quick social creatives in code); **Teams prototyping** (internal layout experiments before production).

7. **Security anchor (`id="security"`)** — short muted panel: TSX preview executes JS in the user’s profile; only use trusted snippets; link text to “read the project security doc” as placeholder `#` or `docs/tsx-live-preview-security.md` path note.

8. **MIT license strip** — centered muted band: MIT, free to use/modify/distribute.

Constraints:
- **No** fake pricing, **no** signup wall, **no** “AI chat” unless you label it hypothetical — this app has no LLM.
- a11y: one `h1`, logical headings, focus states, external links `rel="noopener noreferrer"`.
- Visual: **#FF7C1E** primary, zinc/slate text, generous whitespace, no garish gradients.

Deliverable: one main component (e.g. `LandingPage`) + minimal `page.tsx` exporting `metadata` + default export. Use a `styles` object with Tailwind class strings **or** utility classes consistently — match whatever the target repo prefers.
```

---

## Greenfield (paste if building outside this repo)

```
Build a single-page OSS marketing site: “Luckee — Next.js to Preview” — browser-only Next.js app: TSX compiled with Babel in-browser, iframe preview with Tailwind + React UMD, graphics saved in localStorage, PNG download, MIT, no backend. Sections: sticky nav (Open app, GitHub), hero, one repo card with clone + copy + GitHub, what you get (4), why browser-only (3), who it’s for (2), short security note, MIT footer. Orange #FF7C1E, zinc neutrals, max-w-5xl, a11y.
```

---

## After you paste output into this repo

- [ ] `metadata.title` / `description` match the hero H1 + lead.
- [ ] GitHub / clone URLs use your real org/repo name.
- [ ] “Open app” points at the real list route (`/` or wherever the graphics table lives).
- [ ] Security strip does not overpromise sandboxing.

---

## Related

- **Hero-only** (THT + Luckee vibe, shorter): `docs/lovable-landing-hero-prompt.md`
- **TSX preview security** (wording for the anchor section): `docs/tsx-live-preview-security.md`
