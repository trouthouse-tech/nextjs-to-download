import html2canvas from "html2canvas";
import { toast } from "sonner";
import type { AppThunk } from "@/store";
import { StudioBuilderActions } from "@/store/builders/studioBuilder";
import { IMAGE_STUDIO_PREVIEW_IFRAME_ELEMENT_ID } from "@/utils/image-creation-studio";

type Status = Promise<200 | 400 | 500>;

/**
 * Captures the studio preview iframe as PNG using `html2canvas`, basename from `currentImageGraphic`.
 * Reads `studioBuilder` + `currentImageGraphic` from Redux; finds the iframe by {@link IMAGE_STUDIO_PREVIEW_IFRAME_ELEMENT_ID}.
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
    const body = iframe?.contentDocument?.body;
    if (!body) {
      toast.error("Add TSX that compiles before downloading");
      return 400;
    }

    const graphic = state.currentImageGraphic;
    const downloadBasename = graphic.title || graphic.id || "layout";

    dispatch(StudioBuilderActions.setIsDownloadingPreviewPng(true));
    try {
      const canvas = await html2canvas(body, {
        backgroundColor: "#ffffff",
        scale: 2,
        useCORS: true,
        logging: false,
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
