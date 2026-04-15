"use client";

import { GraphicsListHeader, GraphicsListNewGraphicButton } from "./header";
import { GraphicsListCreateModal } from "./header/create";

import { ImageGraphicsTable } from "./table";

/**
 * Table of layout projects stored in `localStorage`; create opens the studio.
 */
export const ImageGraphicsListPage = () => {
  return (
    <div className={styles.routeShell}>
      <GraphicsListHeader />

      <div className={styles.itemsBody}>
        <ImageGraphicsTable />

        <div className={styles.belowTableRow}>
          <GraphicsListNewGraphicButton />
        </div>
      </div>

      <GraphicsListCreateModal />
    </div>
  );
};

const styles = {
  routeShell: `flex w-full min-w-0 flex-col`,
  itemsBody: `flex min-w-0 flex-col gap-2 px-4 pb-8 pt-1`,
  belowTableRow: `
    flex flex-wrap items-center justify-center gap-2 border-t border-gray-200 pt-4 sm:justify-start
  `,
};
