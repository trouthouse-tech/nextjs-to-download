# Image creation studio helpers (`src/utils/image-creation-studio`)

Imagine you have **coloring paper** (your graphic) and a **little TV** (the preview box). This folder is the **grown-up stuff behind the curtain** that makes the TV show your drawing, saves it in a **treasure box** (`localStorage`), and picks **paper sizes** (Instagram square, story, etc.).

Nothing here talks to a server. It all runs in **your browser**. If something breaks, it is usually because the browser could not load a helper from the internet (see below) or your TSX has a typo.

---

## What you feel as a user (the happy path)

1. You tap **“New graphic”** and maybe pick a **size** (square, tall, wide). That list of sizes comes from **`social-canvas-presets.ts`**. We are not magic—we just copy common pixel sizes people use on apps.

2. You type **TSX** on the left. After a short wait, the **preview** on the right tries to show it.  
   **What is going on:** your words get turned into plain JavaScript (`compile-image-studio-tsx.ts`), then stuffed into a **tiny fake website** that only lives inside the preview iframe (`build-tsx-react-preview-src-doc.ts` + `studio-iframe-src-doc.ts`). That fake website loads **Tailwind** and **React** from the internet so your `className` and JSX work. If the internet is grumpy, the TV stays blank or shows an error.

3. When you come back tomorrow, we open your **saved box** and read `studioDraft` safely (`parse-studio-draft-from-metadata.ts`) so we do not crash on weird old data.

---

## The big idea (still simple)

- **Preview = a separate mini-page** inside an iframe (`srcDoc`). That is how browsers work: we give the iframe one long **HTML string**. It is not React inside React the normal way; it is a **dollhouse** with its own lights (React UMD) and rules.

- **Your TSX is “trusted paint.”** This app is for you playing in your own browser. Do not treat it like Fort Knox. See the project security doc for the serious version.

---

## File guide: what each one does for you

### `social-canvas-presets.ts`

**You see:** chips like “Instagram · Post (1:1)” when you make a graphic.  
**What is going on:** a boring list of `{ width, height, label }`. Picking one fills the width/height boxes. That is it.

---

### `strip-react-imports-from-image-studio-tsx.ts`

**You see:** fewer weird compile errors when you wrote `import React from "react"`.  
**What is going on:** the preview only knows how to `require("react")` from the fake helper we inject. Babel was trying to `require` other paths we do not ship. So we **delete a few common import lines** before compiling. The preview still gives you `React`; you do not need those imports for the dollhouse.

---

### `compile-image-studio-tsx.ts`

**You see:** either a working preview or a red **“TSX compile error”** message.  
**What is going on:** we run **Babel in the browser** and turn TSX → JavaScript (CommonJS style) so the dollhouse can run it. If Babel throws, you see the error text instead of a picture.

---

### `escape-for-inline-script.ts`

**You see:** hopefully nothing special—things just do not explode.  
**What is going on:** when we put JavaScript **inside** an HTML `<script>...</script>`, a bad `</script>` inside your code could **break out** of the script like a loose hose. We tweak those sequences so the hose stays inside the pipe. This is a safety stitch, not a full security audit.

---

### `build-tsx-react-preview-src-doc.ts`

**You see:** the **live TSX preview** (or an error printed inside the preview).  
**What is going on:** we build one big HTML string:

- Load **Tailwind Play** from the internet (so classes work).
- Load **React + ReactDOM** from **unpkg** (pinned to a React version that still ships **UMD** builds—think “old-school script tags”).
- A small **boot script** (yes, written as text) that:
  - pretends to be `require` but only answers for `react` / JSX runtime,
  - runs your compiled code,
  - finds `export default`,
  - calls `createRoot` or `render` into a `#root` div.

Why strings? Because the iframe only eats a **string dinner** (`srcDoc`). The dinner has to include recipes as text. It feels ugly in code reviews; for this OSS tool it is normal.

---

### `studio-iframe-src-doc.ts`

**You see:** the preview updates when you type; the PNG download code can find the iframe by id.  
**What is going on:**

- **`computeStudioIframeSrcDoc`** compiles TSX when present and builds `buildTsxReactPreviewSrcDoc`, otherwise an empty string (no preview box).

- **`clampStudioPreviewDimension`** keeps numbers sensible (not 0, not giant) so the dollhouse has a stable size.

- **`IMAGE_STUDIO_PREVIEW_IFRAME_ELEMENT_ID`** is a stable name so other code can `document.getElementById(...)` without passing React refs through the whole app.

---

### `parse-studio-draft-from-metadata.ts`

**You see:** when you open **Studio**, your last TSX is there (or a clean slate if nothing was saved).  
**What is going on:** saved JSON might be messy. We read `metadata.studioDraft` only if it looks like a small object with strings. Otherwise we say “nothing here” (`null`) instead of crashing. There is a **unit test** next to this file.

---

## Quick “when something looks wrong”

| What you see | Plain guess |
|----------------|-------------|
| Preview blank, console mentions network | CDN (Tailwind / unpkg) blocked or offline. |
| “Unsupported import …” | You tried to import something that is not `react` in the preview dollhouse. |
| Preview never appears | Add TSX and fix compile errors—read the red box. |
| Sizes look wrong | Check `social-canvas-presets` or the numbers you typed (we clamp to 64–8192). |

---

## Where to read more (less “age 5”)

- Project doc on **TSX preview security**: `docs/tsx-live-preview-security.md` (from repo root).

---

## Tests

- `parse-studio-draft-from-metadata.test.ts` — run `npm test` from the repo root.
