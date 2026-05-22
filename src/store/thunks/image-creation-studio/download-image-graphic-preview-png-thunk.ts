import html2canvas from "html2canvas";
import { toast } from "sonner";
import type { AppThunk } from "@/store";
import { StudioBuilderActions } from "@/store/builders/studioBuilder";
import {
  IMAGE_STUDIO_PREVIEW_IFRAME_ELEMENT_ID,
  IMAGE_STUDIO_PREVIEW_ROOT_ELEMENT_ID,
} from "@/utils/image-creation-studio";

type Status = Promise<200 | 400 | 500>;

/**
 * Captures the studio preview iframe as PNG using `html2canvas`, basename from `currentImageGraphic`.
 * Targets `#root` inside the iframe (not `body`) and enables `foreignObjectRendering` so labels match
 * the live preview; normalizes font-smoothing on the cloned document because the canvas path differs
 * from `-webkit-font-smoothing: antialiased` on the iframe body.
 */
export const downloadImageGraphicPreviewPngThunk = (): AppThunk<Status> => {
  return async (dispatch, getState): Status => {
    const state = getState();
    const graphicId = state.currentImageGraphic.id;
    if (!graphicId) {
      toast.error("Missing graphic");
      return 400;
    }

    if (typeof document === "undefined") {
      return 500;
    }

    const iframe = document.getElementById(IMAGE_STUDIO_PREVIEW_IFRAME_ELEMENT_ID) as HTMLIFrameElement | null;
    const doc = iframe?.contentDocument;
    const body = doc?.body;
    if (!doc || !body) {
      toast.error("Add TSX that compiles before downloading");
      return 400;
    }

    const root = doc.getElementById(IMAGE_STUDIO_PREVIEW_ROOT_ELEMENT_ID);
    const target = (root ?? body) as HTMLElement;

    const graphic = state.currentImageGraphic;
    const downloadBasename = graphic.title || graphic.id || "layout";

    dispatch(StudioBuilderActions.setIsDownloadingPreviewPng(true));
    try {
      const canvas = await html2canvas(target, {
        backgroundColor: "#ffffff",
        foreignObjectRendering: true,
        scale: 2,
        scrollX: 0,
        scrollY: 0,
        useCORS: true,
        logging: false,
        onclone: (clonedDoc) => {
          const clonedBody = clonedDoc.body;
          clonedBody.classList.remove("antialiased");
          clonedBody.style.setProperty("-webkit-font-smoothing", "auto");
          clonedBody.style.setProperty("moz-osx-font-smoothing", "auto");
          clonedBody.style.minHeight = "0";
        },
      });
      const safe = downloadBasename.replace(/[^a-zA-Z0-9-_]+/g, "-").slice(0, 60) || "layout";
      const url = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = url;
      a.download = `${safe}-preview.png`;
      a.click();
      toast.success("PNG downloaded");
      return 200;
    } catch {
      toast.error("Could not capture preview as image");
      return 500;
    } finally {
      dispatch(StudioBuilderActions.setIsDownloadingPreviewPng(false));
    }
  };
};
