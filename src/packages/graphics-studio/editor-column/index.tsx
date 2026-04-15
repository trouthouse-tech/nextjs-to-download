"use client";

import { ClipboardCopy, Save } from "lucide-react";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/store";
import { StudioBuilderActions } from "@/store/builders/studioBuilder";
import { saveImageGraphicStudioDraftThunk } from "@/store/thunks";

/**
 * Left column: TSX from your own LLM/CLI + Save/Copy.
 */
export const ImageCreationStudioEditorColumn = () => {
  const dispatch = useAppDispatch();
  const tsxDraft = useAppSelector((s) => s.studioBuilder.tsxDraft);
  const isSavingDraft = useAppSelector((s) => s.studioBuilder.isSavingDraft);

  const handleCopyTsx = async () => {
    const text = tsxDraft.trim();
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      toast.success("TSX copied");
    } catch {
      toast.error("Could not copy");
    }
  };

  const handleSaveDraft = async () => {
    const code = await dispatch(saveImageGraphicStudioDraftThunk());
    if (code === 200) {
      toast.success("Draft saved");
      return;
    }
    if (code === 400) {
      toast.error("Missing graphic");
      return;
    }
    toast.error("Could not save draft");
  };

  return (
    <div className={styles.root}>
      <div className={styles.panel}>
        <div className={styles.panelHeader}>
          <h2 className={styles.h2}>TSX (from your LLM)</h2>
          <div className={styles.panelHeaderActions}>
            <button
              type="button"
              className={styles.secondaryBtn}
              onClick={() => void handleCopyTsx()}
              disabled={!tsxDraft.trim()}
            >
              <ClipboardCopy className={styles.btnIcon} aria-hidden />
              Copy
            </button>
            <button type="button" className={styles.primaryBtn} onClick={() => void handleSaveDraft()} disabled={isSavingDraft}>
              <Save className={styles.btnIcon} aria-hidden />
              {isSavingDraft ? "Saving…" : "Save"}
            </button>
          </div>
        </div>

        <p className={styles.hint}>
          Use ChatGPT, Claude, Cursor, a CLI—whatever you like—to generate a Next.js{" "}
          <code className={styles.code}>use client</code> component. Paste the TSX here—the preview compiles it after a
          short debounce. <span className={styles.em}>Save</span> persists TSX for this graphic.
        </p>
        <textarea
          className={styles.codeArea}
          value={tsxDraft}
          onChange={(e) => dispatch(StudioBuilderActions.setTsxDraft(e.target.value))}
          placeholder={`'use client';\nimport React from 'react';\n\nexport default function GeneratedPreview() { ... }`}
          spellCheck={false}
        />
      </div>
    </div>
  );
};

const styles = {
  root: `
    flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden
  `,
  panel: `
    flex min-h-0 min-w-0 flex-1 flex-col rounded-sm border border-gray-200 bg-white p-4 shadow-sm
  `,
  panelHeader: `
    flex flex-wrap items-center justify-between gap-2 shrink-0
  `,
  panelHeaderActions: `
    flex flex-wrap items-center gap-2
  `,
  h2: `
    text-sm font-semibold text-gray-900
  `,
  hint: `
    mt-2 text-xs text-gray-500 shrink-0 leading-relaxed
  `,
  em: `
    font-semibold text-gray-800
  `,
  code: `
    rounded bg-gray-100 px-1 py-0.5 text-xs font-mono text-gray-800
  `,
  codeArea: `
    mt-3 min-h-[min(50vh,320px)] w-full flex-1 resize-none rounded-md border border-gray-200 bg-zinc-50 px-3 py-2
    font-mono text-xs text-gray-900 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500
  `,
  secondaryBtn: `
    inline-flex items-center gap-1.5 rounded-md border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium
    text-gray-800 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50
  `,
  primaryBtn: `
    inline-flex items-center gap-1.5 rounded-md border border-orange-500 bg-orange-500 px-2.5 py-1.5 text-xs font-medium
    text-white hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50
  `,
  btnIcon: `
    h-4 w-4 shrink-0
  `,
};
