"use client";

import type { ReactNode } from "react";
import { useCallback, useState } from "react";
import { AppLayoutHeader, useAppLayoutBreadcrumbs } from "./app-layout-header";
import { LocalWelcomeModal } from "./local-welcome-modal";
import { Sidebar } from "./sidebar";

type AppShellProps = {
  children: ReactNode;
};

/**
 * Luckee-style layout: fixed sidebar + header breadcrumbs + scrollable main column.
 */
export const AppShell = (props: AppShellProps) => {
  const { children } = props;
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const breadcrumbItems = useAppLayoutBreadcrumbs();

  const handleToggleSidebarCollapsed = useCallback(() => {
    setSidebarCollapsed((current) => !current);
  }, []);

  return (
    <>
      <div className="flex min-h-screen w-full bg-zinc-50">
        <Sidebar collapsed={sidebarCollapsed} onToggleCollapsed={handleToggleSidebarCollapsed} />
        <div className="flex min-h-0 min-w-0 flex-1 flex-col">
          <AppLayoutHeader
            breadcrumbItems={breadcrumbItems}
            isSidebarCollapsed={sidebarCollapsed}
            onToggleSidebarCollapsed={handleToggleSidebarCollapsed}
          />
          {children}
        </div>
      </div>
      <LocalWelcomeModal />
    </>
  );
};
