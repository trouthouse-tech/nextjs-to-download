"use client";

import { useMemo } from "react";
import { useAppSelector } from "@/store";
import type { ImageGraphic } from "@/model";
import { ImageGraphicsTableRow } from "./row";

/**
 * Sorted table of image graphics for the local user.
 */
export const ImageGraphicsTable = () => {
  const byId = useAppSelector((s) => s.imageGraphics);

  const rows = useMemo(() => {
    const list = Object.values(byId) as ImageGraphic[];
    return list.sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : a.updatedAt > b.updatedAt ? -1 : 0));
  }, [byId]);

  if (rows.length === 0) {
    return (
      <div className={styles.empty}>
        <p className={styles.emptyText}>No graphics yet. Create one to start a layout project.</p>
      </div>
    );
  }

  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <thead>
          <tr className={styles.trHead}>
            <th className={styles.th}>Title</th>
            <th className={styles.thMuted}>Canvas</th>
            <th className={styles.thMuted}>Updated</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((g) => (
            <ImageGraphicsTableRow key={g.id} graphic={g} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  empty: `
    rounded-md border border-dashed border-gray-300 bg-gray-50 px-4 py-10 text-center
  `,
  emptyText: `text-sm text-gray-600`,
  tableWrap: `
    overflow-x-auto rounded-md border border-gray-200 bg-white
  `,
  table: `
    min-w-full border-collapse text-left text-sm
  `,
  trHead: `
    border-b border-gray-200 bg-gray-50
  `,
  th: `
    px-3 py-2 font-semibold text-gray-900
  `,
  thMuted: `
    px-3 py-2 font-semibold text-gray-500 whitespace-nowrap
  `,
};
