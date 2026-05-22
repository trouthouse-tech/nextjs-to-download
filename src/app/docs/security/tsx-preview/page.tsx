import type { Metadata } from "next";
import Link from "next/link";
import { DOCS_PATH } from "@/config/routes";

export const metadata: Metadata = {
  title: "TSX live preview (security) | Documentation",
  description: "Trust model for the in-browser TSX preview: iframe sandbox, CDNs, and trusted input.",
};

/**
 * Security notes for TSX live preview (canonical in-app copy).
 */
export default function DocsSecurityTsxPreviewPage() {
  return (
    <article className={styles.article}>
      <p className={styles.breadcrumb}>
        <Link href={DOCS_PATH} className={styles.breadcrumbLink}>
          Documentation
        </Link>
        <span className={styles.breadcrumbSep} aria-hidden>
          /
        </span>
        <span className={styles.breadcrumbCurrent}>Security · TSX live preview</span>
      </p>
      <h1 className={styles.h1}>TSX live preview — security</h1>
      <p className={styles.lead}>
        The preview transpiles TSX with <code className={styles.code}>@babel/standalone</code> and runs the result in an
        iframe that loads React UMD and the Tailwind Play CDN. That is <strong className={styles.strong}>arbitrary code execution</strong>{" "}
        in the visitor&apos;s browser for whatever string is in the editor.
      </p>

      <ul className={styles.ul}>
        <li className={styles.li}>
          The iframe uses <code className={styles.code}>sandbox=&quot;allow-scripts allow-same-origin&quot;</code> so the
          parent can read the iframe for PNG capture. Do <strong className={styles.strong}>not</strong> treat that as a
          strong isolation boundary for untrusted tenants.
        </li>
        <li className={styles.li}>
          Only <code className={styles.code}>react</code> is shimmed for <code className={styles.code}>require</code>;
          other imports fail by design. That limits accidental complexity, <strong className={styles.strong}>not</strong>{" "}
          malicious use of DOM, <code className={styles.code}>fetch</code>, timers, etc.
        </li>
      </ul>

      <p className={styles.footer}>
        This build is intended for <strong className={styles.strong}>local / trusted use</strong>. If strangers can supply
        TSX, you need a different architecture (separate origin, no cookies, server-side rendering with limits, or static
        templates only).
      </p>
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
    mt-3 text-sm leading-relaxed text-zinc-700
  `,
  ul: `
    mt-6 list-disc space-y-4 pl-5 text-sm leading-relaxed text-zinc-700
  `,
  li: `
    marker:text-zinc-300
  `,
  strong: `
    font-semibold text-zinc-900
  `,
  code: `
    rounded bg-zinc-100 px-1 py-0.5 text-xs font-mono text-zinc-800
  `,
  footer: `
    mt-8 border-t border-zinc-200 pt-6 text-sm leading-relaxed text-zinc-600
  `,
};
