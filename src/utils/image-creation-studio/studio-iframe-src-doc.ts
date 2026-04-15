import { buildTsxReactPreviewSrcDoc } from "./build-tsx-react-preview-src-doc";
import { compileImageStudioTsx } from "./compile-image-studio-tsx";

/** Stable `id` on the studio preview iframe so thunks can locate it without React refs. */
export const IMAGE_STUDIO_PREVIEW_IFRAME_ELEMENT_ID = "image-studio-preview-iframe";

export const clampStudioPreviewDimension = (n: number, fallback: number): number => {
  if (!Number.isFinite(n)) return fallback;
  const r = Math.round(n);
  if (r < 64) return 64;
  if (r > 8192) return 8192;
  return r;
};

type ComputeStudioIframeSrcDocParams = {
  tsxDraft: string;
  previewW: number;
  previewH: number;
};

/**
 * Builds the `srcDoc` string for the studio preview iframe (compiled TSX only; empty if TSX missing or compile fails).
 */
export const computeStudioIframeSrcDoc = (params: ComputeStudioIframeSrcDocParams): string => {
  const trimmed = params.tsxDraft.trim();
  if (!trimmed) {
    return "";
  }
  const result = compileImageStudioTsx(params.tsxDraft);
  if ("error" in result) {
    return "";
  }
  return buildTsxReactPreviewSrcDoc(result.code, { widthPx: params.previewW, heightPx: params.previewH });
};
