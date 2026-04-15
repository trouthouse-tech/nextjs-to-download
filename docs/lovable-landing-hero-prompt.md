# Lovable prompt — single hero landing (THT + Luckee marketing vibe)

Copy everything inside the block below into Lovable (or any AI builder). Adjust product name and CTAs to match **nextjs-to-download** (TSX preview → PNG, client-only, open source).

---

**Prompt (paste below)**

Build a **single-page marketing site** with **only a hero section** (no footer nav mega-menu, no pricing tables). Stack: **React + Tailwind**. Mobile-first, polished typography.

**Visual references (match the *feel*, do not copy proprietary logos except where noted):**

1. **TroutHouseTech–style hero** (`LandingHeroSection` vibe):  
   - Full-width section, **lots of vertical padding** (`py-20`–`py-28` on desktop).  
   - **Huge headline** (`text-4xl` → `text-6xl`), **tight tracking**, **leading ~1.05**.  
   - Split headline: first part neutral (`text-zinc-900` or `text-foreground`), second part **accent** (`text-orange-500` or your theme accent — THT marketing uses **#FF7C1E** for emphasis).  
   - **Subheading** under the headline: `text-lg`–`text-xl`, **muted** gray (`text-zinc-600`), max width ~`28rem`–`32rem`, relaxed line-height.  
   - Below that, a **horizontal “stats” or credibility strip**: three mini columns (e.g. label + small caption), separated by **thin vertical dividers** on `sm+`, with a **top border** separating it from the copy above (`border-t border-zinc-200 pt-6 mt-10`). Stats use **bold small titles** + **muted tiny labels** (same pattern as THT “AI-Native / Open + Paid / Philadelphia” row).

2. **Luckee marketing–style hero accents** (`MarketingLanding` left column vibe):  
   - Optional **pill badge** above the headline: rounded-full, subtle border, muted background, **tiny uppercase or semibold** text, small **sparkle or star icon** from `lucide-react`. Example label: **“Free & open source”** or **“Runs in your browser”**.  
   - **Primary CTA** + **secondary CTA** in a row on desktop, stacked on mobile:  
     - Primary: solid fill (orange `#FF7C1E` or zinc-900), white text, medium weight, comfortable padding, subtle hover darkening.  
     - Secondary: outline or ghost (`border border-zinc-300`, hover `bg-zinc-50`).  
     - Optional small arrow icons on buttons (`lucide-react` `ArrowRight`).  
   - Optional **three micro-pillars** under CTAs (like Luckee’s “AI + you / Free / OSS” row): simple **3-column grid**, each cell: **one bold word** + **one muted micro-label** beneath; separated by a **top border** from CTAs.

**Brand mark:**  
- Place **`/public/logo.svg`** in the hero: a **lime lightning bolt** mark (fill **`#D7F336`**) on transparent SVG. Use it **small** in the top-left of the hero (or next to the product name), e.g. **28–36px tall**, `object-contain`. Do **not** stretch or recolor the SVG paths; keep the lime on a **white or very light zinc-50** background so it pops. If the builder cannot import the file, recreate the same bolt shape and hex fill.

**Layout:**  
- **Centered content** `max-w-3xl` or `max-w-4xl` inside `max-w-6xl mx-auto px-6 lg:px-8`.  
- **Background:** clean white or `zinc-50`; **bottom border** `border-b border-zinc-200` to separate hero from future sections (even if empty below).  
- No dark-mode requirement unless trivial.

**Copy direction (replace with final product strings):**  
- Product: **browser-based layout lab** — paste TSX, live preview, save drafts locally, export PNG/PDF.  
- Tone: **confident, minimal jargon**, one clear value prop in the subheading.  
- CTAs: e.g. **“Open app”** (primary → `#` or `/app`) and **“View on GitHub”** (secondary, external).

**Constraints:**  
- **Hero only** — no carousel dependency unless you implement a **very subtle** headline fade (optional).  
- No forms, no email capture.  
- Accessible: semantic `<section>`, one `<h1>`, button/link focus rings.

Deliver: **one page route** (e.g. `/`) with a single `<Hero />` component and Tailwind classes (or CSS modules if the tool prefers). Include **`logo.svg`** in `public/`.

---

**End prompt**
