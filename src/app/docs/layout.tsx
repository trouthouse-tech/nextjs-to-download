import type { ReactNode } from "react";
import { DocsShell } from "@/packages/docs";

/**
 * Docs segment layout: inner sidebar + article column.
 */
export default function DocsLayout(props: { children: ReactNode }) {
  const { children } = props;
  return <DocsShell>{children}</DocsShell>;
}
