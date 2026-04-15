import type { SidebarSection } from "./types";

/**
 * Single nav item: Graphics (list + studio live under the same area).
 */
export const getAppSidebarSections = (): SidebarSection[] => {
  return [
    {
      title: "",
      links: [{ name: "Graphics", href: "/" }],
    },
  ];
};
