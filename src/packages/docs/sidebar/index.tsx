"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { DOCS_PATH } from "@/config/routes";
import { DOCS_NAV_ENTRIES, type DocsNavEntry } from "@/packages/docs/navigation";

const isLinkActive = (href: string, pathname: string): boolean => {
  if (href === DOCS_PATH) {
    return pathname === DOCS_PATH;
  }
  return pathname === href || pathname.startsWith(`${href}/`);
};

const renderEntry = (entry: DocsNavEntry, pathname: string) => {
  if (entry.kind === "label") {
    return (
      <li key={entry.text} className={styles.labelRow}>
        <p className={styles.sectionLabel}>{entry.text}</p>
      </li>
    );
  }
  const active = isLinkActive(entry.href, pathname);
  return (
    <li key={entry.href}>
      <Link href={entry.href} className={active ? styles.linkActive : styles.link}>
        {entry.name}
      </Link>
    </li>
  );
};

/**
 * Left rail for `/docs`: guides from {@link DOCS_NAV_ENTRIES}.
 */
export const DocsSidebar = () => {
  const pathname = usePathname();
  const items = useMemo(() => DOCS_NAV_ENTRIES.map((e) => renderEntry(e, pathname)), [pathname]);

  return (
    <aside className={styles.aside}>
      <div className={styles.inner}>
        <p className={styles.kicker}>Documentation</p>
        <ul className={styles.list}>{items}</ul>
      </div>
    </aside>
  );
};

const styles = {
  aside: `
    w-full shrink-0 border-b border-zinc-200 bg-zinc-50
    lg:w-56 lg:border-b-0 lg:border-r
  `,
  inner: `px-4 py-6 lg:py-8`,
  kicker: `
    text-[11px] font-semibold uppercase tracking-wide text-zinc-500
  `,
  list: `mt-4 space-y-1`,
  labelRow: `pt-3 pb-1 first:pt-0`,
  sectionLabel: `text-[11px] font-semibold uppercase tracking-wide text-zinc-400`,
  link: `
    block rounded-md px-2.5 py-2 text-sm font-medium text-zinc-700
    hover:bg-white hover:text-zinc-900
  `,
  linkActive: `
    block rounded-md px-2.5 py-2 text-sm font-semibold text-orange-700
    bg-orange-50 ring-1 ring-orange-200/80
  `,
};
