"use client";

import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import { StudioBuilderActions } from "@/store/builders/studioBuilder";
import {
  clampStudioPreviewDimension,
  compileImageStudioTsx,
  computeStudioIframeSrcDoc,
  IMAGE_STUDIO_PREVIEW_IFRAME_ELEMENT_ID,
} from "@/utils/image-creation-studio";
import { ImageCreationStudioBuilderColumnActions } from "./actions";

const TSX_PREVIEW_DEBOUNCE_MS = 400;

/**
 * Right column: live TSX preview for the layout builder.
 */
export const ImageCreationStudioBuilderColumn = () => {
  const dispatch = useAppDispatch();
  const tsxDraft = useAppSelector((s) => s.studioBuilder.tsxDraft);
  const tsxBaselineForPreview = useAppSelector((s) => s.studioBuilder.tsxBaselineForPreview);
  const graphicId = useAppSelector((s) => s.currentImageGraphic.id);
  const canvasWidthPx = useAppSelector((s) => s.currentImageGraphic.canvasWidthPx);
  const canvasHeightPx = useAppSelector((s) => s.currentImageGraphic.canvasHeightPx);

  const previewW = clampStudioPreviewDimension(canvasWidthPx, 960);
  const previewH = clampStudioPreviewDimension(canvasHeightPx, 540);

  const tsxPreviewOutOfSync = Boolean(tsxDraft.trim()) && tsxDraft !== tsxBaselineForPreview;

  const [debouncedTsxDraft, setDebouncedTsxDraft] = useState(tsxDraft);

  useEffect(() => {
    if (!tsxDraft.trim()) {
      setDebouncedTsxDraft("");
      return;
    }
    const id = window.setTimeout(() => setDebouncedTsxDraft(tsxDraft), TSX_PREVIEW_DEBOUNCE_MS);
    return () => window.clearTimeout(id);
  }, [tsxDraft]);

  /** When the graphic changes, align baseline to the loaded draft. */
  useEffect(() => {
    dispatch(StudioBuilderActions.alignTsxBaselineToCurrentDraft());
  }, [dispatch, graphicId]);

  const iframeSrcDoc = useMemo(
    () =>
      computeStudioIframeSrcDoc({
        tsxDraft: debouncedTsxDraft,
        previewW,
        previewH,
      }),
    [debouncedTsxDraft, previewW, previewH],
  );

  const tsxCompileError = useMemo(() => {
    const trimmed = debouncedTsxDraft.trim();
    if (!trimmed) {
      return null;
    }
    const result = compileImageStudioTsx(debouncedTsxDraft);
    if ("error" in result) {
      return result.error;
    }
    return null;
  }, [debouncedTsxDraft]);

  const previewHasContent = Boolean(iframeSrcDoc.trim());

  return (
    <div className={styles.root}>
      <section className={styles.panel}>
        <div className={styles.headerRow}>
          <div className={styles.titleBlock}>
            <h2 className={styles.h2}>Preview</h2>
            <p className={styles.canvasMeta}>
              Canvas {previewW}×{previewH}px
            </p>
          </div>
          <ImageCreationStudioBuilderColumnActions previewHasContent={previewHasContent} />
        </div>
        <div className={styles.callout} role="note">
          <p className={styles.calloutTitle}>Live TSX preview</p>
          <p className={styles.calloutBody}>
            With TSX in the editor, this panel compiles it in your browser (debounced) and renders React inside the
            iframe with Tailwind Play CDN. Your component must <strong className={styles.strong}>export default</strong>{" "}
            a React component. Only <strong className={styles.strong}>react</strong> imports are supported in preview;
            other modules will fail. Tailwind may miss dynamically built class names—prefer static{" "}
            <code className={styles.code}>className</code> keys. Code runs in your browser profile; treat it like trusted
            studio input, not a public sandbox.
          </p>
        </div>
        {tsxPreviewOutOfSync ? (
          <p className={styles.staleBanner} role="status">
            TSX changed since last alignment—live preview follows TSX. Save to persist the current draft.
          </p>
        ) : null}
        {tsxCompileError ? (
          <div className={styles.compileError} role="alert">
            <p className={styles.compileErrorTitle}>TSX compile error</p>
            <pre className={styles.compileErrorPre}>{tsxCompileError}</pre>
          </div>
        ) : null}
        {iframeSrcDoc ? (
          <div className={styles.frameViewport}>
            <iframe
              id={IMAGE_STUDIO_PREVIEW_IFRAME_ELEMENT_ID}
              title="Layout preview"
              className={styles.previewFrame}
              width={previewW}
              height={previewH}
              sandbox="allow-scripts allow-same-origin"
              srcDoc={iframeSrcDoc}
            />
          </div>
        ) : (
          <div className={styles.frameViewport}>
            <div className={styles.placeholder} style={{ width: previewW, height: previewH }}>
              <p className={styles.placeholderText}>
                {tsxDraft.trim()
                  ? "TSX preview will appear after a short debounce once TSX compiles, or fix compile errors above."
                  : "Add TSX in the editor to render a preview."}
              </p>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

const styles = {
  root: `
    flex min-h-0 min-w-0 flex-1 flex-col gap-4 overflow-y-auto p-4
  `,
  panel: `
    rounded-sm border border-gray-200 bg-white p-4 shadow-sm
  `,
  h2: `
    text-sm font-semibold text-gray-900
  `,
  titleBlock: `
    flex min-w-0 flex-col gap-0.5
  `,
  canvasMeta: `
    text-[11px] font-medium text-gray-500
  `,
  callout: `
    mt-2 rounded-md border border-amber-200 bg-amber-50 px-3 py-2
  `,
  calloutTitle: `
    text-xs font-semibold text-amber-900
  `,
  calloutBody: `
    mt-1 text-xs text-amber-950/90 leading-relaxed
  `,
  strong: `
    font-semibold text-amber-950
  `,
  staleBanner: `
    mt-2 rounded-md border border-orange-300 bg-orange-50 px-3 py-2 text-xs font-medium text-orange-900
  `,
  compileError: `
    mt-2 rounded-md border border-red-200 bg-red-50 px-3 py-2
  `,
  compileErrorTitle: `
    text-xs font-semibold text-red-900
  `,
  compileErrorPre: `
    mt-1 max-h-32 overflow-auto text-xs font-mono text-red-950 whitespace-pre-wrap break-words
  `,
  code: `
    rounded bg-gray-100 px-1 py-0.5 text-xs font-mono text-gray-800
  `,
  headerRow: `
    flex flex-wrap items-center justify-between gap-2
  `,
  frameViewport: `
    mt-3 max-w-full overflow-auto rounded-md border border-gray-200 bg-gray-100
  `,
  placeholder: `
    flex max-w-none shrink-0 items-center justify-center rounded-md border border-dashed
    border-gray-300 bg-gray-50
  `,
  placeholderText: `
    text-sm text-gray-500
  `,
  previewFrame: `
    block max-w-none shrink-0 border-0 bg-white
  `,
};
