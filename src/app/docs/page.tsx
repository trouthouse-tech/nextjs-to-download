import type { Metadata } from "next";
import Link from "next/link";
import { DOCS_GETTING_STARTED_PATH, DOCS_SECURITY_TSX_PREVIEW_PATH } from "@/config/routes";

export const metadata: Metadata = {
  title: "Documentation | Luckee — NextJS to Preview",
  description: "Guides for the open-source TSX preview studio: getting started, persistence, and security.",
};

/**
 * Docs home: links into locally authored guides.
 */
export default function DocsHomePage() {
  return (
    <article className={styles.article}>
      <h1 className={styles.h1}>Documentation</h1>
      <p className={styles.lead}>
        These pages ship with the app (static TSX). For repo-only drafts, see the <code className={styles.code}>docs/</code>{" "}
        folder at the project root.
      </p>

      <section className={styles.section}>
        <h2 className={styles.h2}>Guides</h2>
        <ul className={styles.ul}>
          <li className={styles.li}>
            <Link href={DOCS_GETTING_STARTED_PATH} className={styles.a}>
              Getting started
            </Link>
            <span className={styles.span}> — run locally, deploy, persistence, API wrappers.</span>
          </li>
          <li className={styles.li}>
            <Link href={DOCS_SECURITY_TSX_PREVIEW_PATH} className={styles.a}>
              TSX live preview (security)
            </Link>
            <span className={styles.span}> — trust model, iframe sandbox, CDN trust.</span>
          </li>
        </ul>
      </section>
    </article>
  );
}

const styles = {
  article: `
    max-w-3xl mx-auto w-full px-6 py-10 lg:px-12 lg:py-12
  `,
  h1: `
    text-2xl font-semibold tracking-tight text-zinc-900
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
  ul: `
    mt-4 list-disc space-y-3 pl-5 text-sm text-zinc-700
  `,
  li: `
    marker:text-zinc-300
  `,
  a: `
    font-semibold text-orange-600 hover:text-orange-700
  `,
  span: `
    text-zinc-600
  `,
  code: `
    rounded bg-zinc-100 px-1 py-0.5 text-xs font-mono text-zinc-800
  `,
};
