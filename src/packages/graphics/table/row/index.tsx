"use client";

import { startTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import type { ImageGraphic } from "@/model";
import { useAppDispatch } from "@/store";
import { openImageGraphicStudioByIdThunk } from "@/store/thunks";
import { formatDateMedium } from "@/utils/date-time";

type ImageGraphicsTableRowProps = {
  graphic: ImageGraphic;
};

export const ImageGraphicsTableRow = (props: ImageGraphicsTableRowProps) => {
  const { graphic } = props;
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleOpenStudio = () => {
    void (async () => {
      const code = await dispatch(openImageGraphicStudioByIdThunk(graphic.id));
      if (code !== 200) {
        toast.error("Could not open studio");
        return;
      }
      startTransition(() => {
        router.push("/studio");
      });
    })();
  };

  return (
    <tr className={styles.tr}>
      <td className={styles.td}>
        <button type="button" className={styles.titleLink} onClick={handleOpenStudio}>
          {graphic.title || "Untitled"}
        </button>
      </td>
      <td className={styles.tdMuted}>
        {graphic.canvasWidthPx}×{graphic.canvasHeightPx}
      </td>
      <td className={styles.tdMuted}>{formatDateMedium(graphic.updatedAt)}</td>
    </tr>
  );
};

const styles = {
  tr: `
    hover:bg-gray-50 transition-colors border-b border-gray-200 last:border-b-0
  `,
  td: `px-3 py-2 align-top text-sm text-gray-900`,
  tdMuted: `px-3 py-2 align-top text-sm text-gray-500 whitespace-nowrap`,
  titleLink: `
    block w-full text-left font-semibold text-gray-900
    hover:text-orange-600 hover:underline
    cursor-pointer bg-transparent border-0 p-0
  `,
};
