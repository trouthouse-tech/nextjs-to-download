import type { ReactNode } from "react";
import { DocsSidebar } from "./sidebar";

type DocsShellProps = {
  children: ReactNode;
};

/**
 * Docs layout: inner sidebar + scrollable article column (nested under AppShell).
 */
export const DocsShell = (props: DocsShellProps) => {
  const { children } = props;

  return (
    <div className={styles.root}>
      <DocsSidebar />
      <div className={styles.main}>{children}</div>
    </div>
  );
};

const styles = {
  root: `
    flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden
    lg:flex-row
  `,
  main: `
    min-h-0 min-w-0 flex-1 overflow-y-auto bg-white
    lg:border-l lg:border-zinc-200
  `,
};
