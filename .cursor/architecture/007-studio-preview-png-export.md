# 007 — Studio preview PNG export (html2canvas)

## Purpose

Document how **Download image** turns the live TSX preview into a PNG, why that is easy to get wrong, and the conventions we follow so exports match what you see in the iframe.

## In one sentence

We capture the preview **mount node** (`#root`) with **html2canvas**, prefer **browser-accurate text** via **`foreignObjectRendering`**, and normalize **font smoothing** on the cloned document so labels (chips, buttons) do not shift vertically versus the on-screen preview.

## Why this exists

The studio renders compiled TSX inside a **sandboxed `srcDoc` iframe** (Tailwind Play CDN + React UMD). **Download image** must rasterize that preview without a server. We use **html2canvas**, which does **not** take a literal screenshot: it **reconstructs** layout and paints to a `<canvas>`. That reconstruction path can diverge from Chrome—especially for **small text in pills and buttons**—unless we constrain **what** we capture and **how** we capture it.

## Architecture (where the pieces live)

| Piece | Role |
|--------|------|
| `src/packages/graphics-studio/builder-column/actions/index.tsx` | UI: **Download image** dispatches the thunk. |
| `src/store/thunks/image-creation-studio/download-image-graphic-preview-png-thunk.ts` | **html2canvas** call, filename, toasts, loading flag. |
| `src/utils/image-creation-studio/build-tsx-react-preview-src-doc.ts` | Builds iframe HTML; defines **`IMAGE_STUDIO_PREVIEW_ROOT_ELEMENT_ID`** and the `#root` mount used by the boot script. |
| `src/utils/image-creation-studio/studio-iframe-src-doc.ts` | Wires compile output into `srcDoc` when preview dimensions are known. |
| `src/packages/graphics-studio/builder-column/index.tsx` | Renders the preview iframe with id **`IMAGE_STUDIO_PREVIEW_IFRAME_ELEMENT_ID`**. |

Stable DOM ids live in `@/utils/image-creation-studio` so thunks can `document.getElementById(...)` without threading refs through the tree.

## Decisions (do not “fix” export bugs only in TSX)

1. **Capture `#root`, not `body`**  
   The iframe `body` includes full-page layout (`min-h-screen`, global classes). The graphic lives under **`#root`**. Capturing `body` pulls extra layout into the shot and can worsen alignment quirks. The thunk uses **`getElementById(IMAGE_STUDIO_PREVIEW_ROOT_ELEMENT_ID)`** with a fallback to `body` if the root node is missing.

2. **`foreignObjectRendering: true`**  
   html2canvas defaults to **`foreignObjectRendering: false`**, which re-measures and paints text on its own. That often produces **vertical drift** compared to the live preview. **`true`** uses a path that leans on the browser’s layout (SVG `foreignObject`) and typically **matches on-screen text** much more closely. Tradeoff: behavior can vary by browser; if a future bug is Safari-only, consider a documented fallback (retry with `false`).

3. **`scrollX: 0` / `scrollY: 0`**  
   Keeps the capture origin explicit so scroll position inside the iframe does not shift the raster.

4. **`onclone` font-smoothing normalization**  
   The preview `body` uses Tailwind’s **`antialiased`** (`-webkit-font-smoothing: antialiased`). The canvas raster path does not always treat that the same as the live iframe. **`onclone`** strips **`antialiased`** from the cloned `body`, sets smoothing to **`auto`**, and sets **`minHeight: 0`** on the clone body so the clone is not fighting full-viewport min-height during paint.

5. **`scale: 2`**  
   Retained for sharper PNGs on high-DPI displays. If you ever see **subpixel** artifacts at odd zoom levels, try an integer scale tied to `devicePixelRatio`—but treat that as a measured change, not a default churn.

6. **`useCORS: true`**  
   Helps when remote assets participate in the preview; required for some CDN-loaded resources during clone/paint.

## Operational notes

- **Compile first**: the thunk requires `iframe.contentDocument` and a usable `body`; if TSX does not compile, there is nothing to capture.
- **Filename**: derived from `currentImageGraphic.title` or `id`, sanitized for download.
- **Loading state**: `studioBuilder.isDownloadingPreviewPng` is toggled around the async capture.

## When you change preview HTML

If you rename or remove the preview root node, update **`IMAGE_STUDIO_PREVIEW_ROOT_ELEMENT_ID`** and the generated markup / boot script in **`build-tsx-react-preview-src-doc.ts`**, and keep **`download-image-graphic-preview-png-thunk.ts`** in sync.

## Preview `require` shim (not only React)

The boot script defines **`__imageStudioPreviewRequire`**, which resolves **`react`**, **`react/jsx-runtime`**, and minimal **`next/navigation`** / **`next/link`** stubs so Babel-emitted `require()` from pasted Next.js components does not throw. Anything else still errors with “Unsupported import…”. Add new specifiers here only when there is a safe, dependency-free stub.

## Related reading

- `src/utils/image-creation-studio/README.md` — iframe ids, srcDoc pipeline, security notes for live TSX preview.
