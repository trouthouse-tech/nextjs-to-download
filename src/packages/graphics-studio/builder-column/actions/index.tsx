"use client";

import { Download, Loader2 } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store";
import { downloadImageGraphicPreviewPngThunk } from "@/store/thunks";

type ImageCreationStudioBuilderColumnActionsProps = {
  previewHasContent: boolean;
};

/**
 * Toolbar actions for the studio builder column (e.g. PNG export).
 */
export const ImageCreationStudioBuilderColumnActions = (props: ImageCreationStudioBuilderColumnActionsProps) => {
  const { previewHasContent } = props;
  const dispatch = useAppDispatch();
  const isDownloadingPreviewPng = useAppSelector((s) => s.studioBuilder.isDownloadingPreviewPng);

  return (
    <div className={styles.root}>
      <button
        type="button"
        className={styles.secondaryBtn}
        onClick={() => void dispatch(downloadImageGraphicPreviewPngThunk())}
        disabled={!previewHasContent || isDownloadingPreviewPng}
        title="Download the preview as a PNG"
      >
        {isDownloadingPreviewPng ? (
          <Loader2 className={styles.btnIconSpin} aria-hidden />
        ) : (
          <Download className={styles.btnIcon} aria-hidden />
        )}
        Download image
      </button>
    </div>
  );
};

const styles = {
  root: `
    flex flex-wrap items-center gap-2
  `,
  secondaryBtn: `
    inline-flex items-center gap-1.5 rounded-md border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium
    text-gray-800 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50
  `,
  btnIcon: `
    h-4 w-4 shrink-0
  `,
  btnIconSpin: `
    h-4 w-4 shrink-0 animate-spin
  `,
};
