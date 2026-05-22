import type { Metadata } from "next";
import Link from "next/link";
import { DOCS_PATH } from "@/config/routes";

export const metadata: Metadata = {
  title: "Getting started | Documentation",
  description: "Run nextjs-to-download locally, deploy to Vercel, and understand localStorage persistence.",
};

/**
 * Getting started: mirrors root README essentials for the in-app docs site.
 */
export default function DocsGettingStartedPage() {
  return (
    <article className={styles.article}>
      <p className={styles.breadcrumb}>
        <Link href={DOCS_PATH} className={styles.breadcrumbLink}>
          Documentation
        </Link>
        <span className={styles.breadcrumbSep} aria-hidden>
          /
        </span>
        <span className={styles.breadcrumbCurrent}>Getting started</span>
      </p>
      <h1 className={styles.h1}>Getting started</h1>
      <p className={styles.lead}>
        Next.js app that compiles TSX in the browser, shows a live iframe preview at each graphic&apos;s canvas size,
        and lets you save a draft and download a PNG. No Express server: <code className={styles.code}>src/api</code>{" "}
        modules are thin wrappers over <code className={styles.code}>localStorage</code>.
      </p>

      <section className={styles.section}>
        <h2 className={styles.h2}>Run locally</h2>
        <pre className={styles.pre}>
          <code>{`npm install
npm run dev`}</code>
        </pre>
        <p className={styles.p}>
          Open <code className={styles.code}>http://localhost:3000</code>. On localhost (and{" "}
          <code className={styles.code}>127.0.0.1</code> / <code className={styles.code}>.localhost</code>), a one-time
          welcome explains storage and security; you can dismiss it permanently or until you close the tab—clearing site
          data shows it again.
        </p>
        <p className={styles.p}>
          Create a graphic, then open <strong className={styles.strong}>Studio</strong> from the list (
          <code className={styles.code}>/studio</code>).
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.h2}>Deploy to Vercel</h2>
        <p className={styles.p}>
          Push the repo, import in Vercel as a Next.js project, and leave environment variables empty—no secrets are
          required for the default UI. Production serves static/SSR assets and the JS bundle only.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.h2}>Persistence</h2>
        <p className={styles.p}>
          Graphics (title, metadata including <code className={styles.code}>studioDraft.tsx</code>) are stored under the
          key <code className={styles.code}>nextjs-to-download:image-graphics:v1</code> in{" "}
          <code className={styles.code}>localStorage</code>. Export <code className={styles.code}>getStorageKeyForDocs</code>{" "}
          from <code className={styles.code}>@/api/image-creation-studio</code> if you need the key in tooling.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.h2}>API layer</h2>
        <p className={styles.p}>
          <code className={styles.code}>src/api/config.ts</code> exposes <code className={styles.code}>API_BASE_URL</code>{" "}
          for optional future localhost tooling; the default UI does not call it. Thunks in{" "}
          <code className={styles.code}>src/store/thunks/image-creation-studio/</code> call the localStorage-backed
          wrappers and return <code className={styles.code}>200 | 400 | 500</code>.
        </p>
      </section>
    </article>
  );
}

const styles = {
  article: `
    max-w-3xl mx-auto w-full px-6 py-10 lg:px-12 lg:py-12
  `,
  breadcrumb: `
    text-xs text-zinc-500
  `,
  breadcrumbLink: `
    font-medium text-orange-600 hover:text-orange-700
  `,
  breadcrumbSep: `
    mx-1 text-zinc-400
  `,
  breadcrumbCurrent: `
    text-zinc-600
  `,
  h1: `
    mt-2 text-2xl font-semibold tracking-tight text-zinc-900
  `,
  lead: `
    mt-3 text-sm leading-relaxed text-zinc-600
  `,
  section: `
    mt-10
  `,
  h2: `
    text-sm font-semibold uppercase tracking-wide text-zinc-500
  `,
  pre: `
    mt-3 overflow-x-auto rounded-md border border-zinc-200 bg-zinc-50 p-4 text-xs text-zinc-800
  `,
  p: `
    mt-3 text-sm leading-relaxed text-zinc-700
  `,
  strong: `
    font-semibold text-zinc-900
  `,
  code: `
    rounded bg-zinc-100 px-1 py-0.5 text-xs font-mono text-zinc-800
  `,
};
