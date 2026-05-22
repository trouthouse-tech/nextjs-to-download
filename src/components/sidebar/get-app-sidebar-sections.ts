import type { SidebarSection } from "./types";

import { DOCS_PATH } from "@/config/routes";

/**
 * Primary nav: Graphics (list + studio) and in-app Documentation.
 */
export const getAppSidebarSections = (): SidebarSection[] => {
  return [
    {
      title: "",
      links: [
        { name: "Graphics", href: "/" },
        { name: "Docs", href: DOCS_PATH },
      ],
    },
  ];
};
