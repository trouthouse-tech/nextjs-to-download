"use client";

import { startTransition, useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { DOCS_PATH } from "@/config/routes";
import { DOCS_NAV_ENTRIES, type DocsNavLink } from "@/packages/docs";
import { useAppDispatch, useAppSelector } from "@/store";
import { openImageGraphicStudioByIdThunk } from "@/store/thunks";
import type { AppLayoutBreadcrumb } from "./app-layout-breadcrumb";

const graphicMenuLabel = (title: string): string => title.trim() || "Untitled";

const sortGraphicsByMenuLabel = (rows: { id: string; title: string }[]) =>
  [...rows].sort((a, b) => graphicMenuLabel(a.title).localeCompare(graphicMenuLabel(b.title)));

const findDocsLeafName = (pathname: string): string | null => {
  const match = DOCS_NAV_ENTRIES.find(
    (entry): entry is DocsNavLink => entry.kind === "link" && entry.href === pathname,
  );
  return match ? match.name : null;
};

/**
 * Builds header breadcrumbs for Graphics, Studio (with graphic switcher), and Docs routes.
 */
export const useAppLayoutBreadcrumbs = (): AppLayoutBreadcrumb[] => {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const currentGraphic = useAppSelector((s) => s.currentImageGraphic);
  const imageGraphicsById = useAppSelector((s) => s.imageGraphics);

  return useMemo(() => {
    if (pathname.startsWith("/docs")) {
      const leaf = findDocsLeafName(pathname);
      const items: AppLayoutBreadcrumb[] = [{ label: "Documentation", href: DOCS_PATH }];
      if (leaf) {
        items.push({ label: leaf });
      }
      return items;
    }

    if (pathname === "/studio" || pathname.startsWith("/studio/")) {
      const list = sortGraphicsByMenuLabel(
        Object.values(imageGraphicsById).map((g) => ({ id: g.id, title: g.title })),
      );
      const currentId = currentGraphic.id;
      const currentLabel = currentId
        ? graphicMenuLabel(currentGraphic.title)
        : list.length
          ? "…"
          : "No graphics";

      return [
        { label: "Graphics", href: "/" },
        {
          label: currentLabel,
          isPendingSelection: !currentId && list.length > 0,
          menuItems: list.map((row) => ({
            label: graphicMenuLabel(row.title),
            isActive: row.id === currentId,
            onSelect: () => {
              void (async () => {
                const code = await dispatch(openImageGraphicStudioByIdThunk(row.id));
                if (code !== 200) {
                  toast.error("Could not open graphic");
                  return;
                }
                startTransition(() => {
                  router.push("/studio");
                });
              })();
            },
          })),
        },
      ];
    }

    if (pathname === "/") {
      return [{ label: "Graphics" }];
    }

    return [];
  }, [pathname, router, dispatch, currentGraphic.id, currentGraphic.title, imageGraphicsById]);
};
