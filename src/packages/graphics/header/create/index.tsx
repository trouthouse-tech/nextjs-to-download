"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/store";
import { StudioBuilderActions } from "@/store/builders/studioBuilder";
import {
  createImageGraphicThunk,
  openImageGraphicStudioByIdThunk,
} from "@/store/thunks";
import { SOCIAL_CANVAS_PRESETS, type SocialCanvasPreset } from "@/utils/image-creation-studio";

/** When set in `localStorage`, the “where is my data?” callout stays hidden in this browser. */
const CREATE_GRAPHIC_DATA_NOTICE_DISMISSED_KEY = "nextjs-to-download:dismiss-create-graphic-data-notice";

/**
 * Create-graphic modal: title, canvas size, social presets; persists via thunks then opens studio.
 */
export const GraphicsListCreateModal = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [showDataNotice, setShowDataNotice] = useState(true);
  const isOpen = useAppSelector((s) => s.studioBuilder.isCreateGraphicModalOpen);
  const newTitle = useAppSelector((s) => s.studioBuilder.createGraphicTitleDraft);
  const canvasWidthPx = useAppSelector((s) => s.studioBuilder.createGraphicCanvasWidthPx);
  const canvasHeightPx = useAppSelector((s) => s.studioBuilder.createGraphicCanvasHeightPx);
  const selectedPresetId = useAppSelector((s) => s.studioBuilder.createGraphicSelectedPresetId);

  const presetsByPlatform = useMemo(() => {
    const map = new Map<string, SocialCanvasPreset[]>();
    for (const preset of SOCIAL_CANVAS_PRESETS) {
      const list = map.get(preset.platform) ?? [];
      list.push(preset);
      map.set(preset.platform, list);
    }
    return Array.from(map.entries());
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }
    try {
      setShowDataNotice(!window.localStorage.getItem(CREATE_GRAPHIC_DATA_NOTICE_DISMISSED_KEY));
    } catch {
      setShowDataNotice(true);
    }
  }, [isOpen]);

  const dismissDataNotice = () => {
    try {
      window.localStorage.setItem(CREATE_GRAPHIC_DATA_NOTICE_DISMISSED_KEY, "1");
    } catch {
      /* ignore quota / private mode */
    }
    setShowDataNotice(false);
  };

  const handlePickPreset = (preset: SocialCanvasPreset) => {
    dispatch(
      StudioBuilderActions.applyCreateGraphicPreset({
        id: preset.id,
        widthPx: preset.widthPx,
        heightPx: preset.heightPx,
      }),
    );
  };

  const handleDimensionInput = (which: "w" | "h", raw: string) => {
    const n = parseInt(raw, 10);
    if (which === "w") {
      dispatch(StudioBuilderActions.setCreateGraphicCanvasWidthPx(Number.isFinite(n) ? n : 0));
      return;
    }
    dispatch(StudioBuilderActions.setCreateGraphicCanvasHeightPx(Number.isFinite(n) ? n : 0));
  };

  const handleSubmitCreate = async () => {
    const title = newTitle.trim() || "Untitled graphic";
    const w = Math.round(canvasWidthPx);
    const h = Math.round(canvasHeightPx);
    if (!Number.isFinite(w) || !Number.isFinite(h) || w < 64 || h < 64) {
      toast.error("Width and height must be numbers of at least 64px");
      return;
    }
    const newId = await dispatch(
      createImageGraphicThunk({
        title,
        canvasWidthPx: w,
        canvasHeightPx: h,
      }),
    );
    if (!newId) {
      toast.error("Could not create graphic");
      return;
    }
    dispatch(StudioBuilderActions.closeCreateGraphicModal());
    const opened = await dispatch(openImageGraphicStudioByIdThunk(newId));
    if (opened !== 200) {
      toast.error("Could not open studio");
      return;
    }
    router.push("/studio");
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.modalBackdrop} role="presentation" onClick={() => dispatch(StudioBuilderActions.closeCreateGraphicModal())}>
      <div
        className={styles.modalCard}
        role="dialog"
        aria-modal="true"
        aria-labelledby="image-graphic-create-title"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="image-graphic-create-title" className={styles.modalTitle}>
          New layout
        </h2>
        <label className={styles.modalLabel}>
          <span className={styles.modalLabelText}>Title</span>
          <input
            type="text"
            className={styles.modalInput}
            value={newTitle}
            onChange={(e) => dispatch(StudioBuilderActions.setCreateGraphicTitleDraft(e.target.value))}
            placeholder="e.g. Reddit banner"
            autoFocus
          />
        </label>

        <div className={styles.dimSection}>
          <p className={styles.sectionTitle}>Canvas size (px)</p>
          <div className={styles.dimRow}>
            <label className={styles.dimField}>
              <span className={styles.modalLabelText}>Width</span>
              <input
                type="number"
                className={styles.modalInput}
                min={64}
                max={8192}
                value={canvasWidthPx || ""}
                onChange={(e) => handleDimensionInput("w", e.target.value)}
              />
            </label>
            <label className={styles.dimField}>
              <span className={styles.modalLabelText}>Height</span>
              <input
                type="number"
                className={styles.modalInput}
                min={64}
                max={8192}
                value={canvasHeightPx || ""}
                onChange={(e) => handleDimensionInput("h", e.target.value)}
              />
            </label>
          </div>
          <p className={styles.dimHint}>Between 64 and 8192 pixels per side.</p>
        </div>

        <div className={styles.presetsSection}>
          <p className={styles.sectionTitle}>Social & common sizes</p>
          <p className={styles.presetsIntro}>
            Typical landscape, portrait, or square sizes—tap to apply. Orientation is noted per preset.
          </p>
          <div className={styles.presetsScroll}>
            {presetsByPlatform.map(([platform, presets]) => (
              <div key={platform} className={styles.presetGroup}>
                <p className={styles.presetPlatform}>{platform}</p>
                <div className={styles.presetChips}>
                  {presets.map((preset) => (
                    <button
                      key={preset.id}
                      type="button"
                      className={selectedPresetId === preset.id ? styles.presetChipActive : styles.presetChip}
                      onClick={() => handlePickPreset(preset)}
                      title={`${preset.widthPx}×${preset.heightPx}px · ${preset.orientation}`}
                    >
                      <span className={styles.presetChipLabel}>{preset.label}</span>
                      <span className={styles.presetChipMeta}>
                        {preset.widthPx}×{preset.heightPx} · {preset.orientation}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {showDataNotice ? (
          <div className={styles.dataNotice} role="status">
            <p className={styles.dataNoticeText}>
              <span className={styles.dataNoticeStrong}>Your new graphic is created only on this device.</span> It is
              stored in your browser&apos;s <code className={styles.dataNoticeCode}>localStorage</code> (same place as
              your other layouts)—not sent to a server. Another browser or cleared site data won&apos;t have it.
            </p>
            <button type="button" className={styles.dataNoticeDismiss} onClick={dismissDataNotice}>
              Got it
            </button>
          </div>
        ) : null}

        <div className={styles.modalActions}>
          <button type="button" className={styles.modalCancel} onClick={() => dispatch(StudioBuilderActions.closeCreateGraphicModal())}>
            Cancel
          </button>
          <button type="button" className={styles.modalPrimary} onClick={() => void handleSubmitCreate()}>
            Create & open studio
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  modalBackdrop: `
    fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4
  `,
  modalCard: `
    w-full max-w-lg max-h-[min(92vh,720px)] overflow-y-auto rounded-lg border border-gray-200 bg-white p-4 shadow-lg
  `,
  modalTitle: `text-sm font-semibold text-gray-900`,
  modalLabel: `mt-3 flex flex-col gap-1`,
  modalLabelText: `text-xs font-medium text-gray-700`,
  modalInput: `
    w-full rounded-md border border-gray-300 px-2 py-1.5 text-xs text-gray-900
    focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500
  `,
  dimSection: `mt-4`,
  sectionTitle: `text-xs font-semibold text-gray-900`,
  dimRow: `mt-2 grid grid-cols-2 gap-2`,
  dimField: `flex min-w-0 flex-col gap-1`,
  dimHint: `mt-1.5 text-[11px] text-gray-500`,
  presetsSection: `mt-4`,
  presetsIntro: `mt-1 text-[11px] text-gray-600 leading-relaxed`,
  presetsScroll: `mt-2 max-h-52 overflow-y-auto rounded-md border border-gray-100 bg-gray-50/80 p-2`,
  presetGroup: `mb-3 last:mb-0`,
  presetPlatform: `text-[11px] font-semibold uppercase tracking-wide text-gray-500`,
  presetChips: `mt-1 flex flex-wrap gap-1.5`,
  presetChip: `
    flex min-w-0 max-w-full flex-col items-start gap-0.5 rounded-md border border-gray-200 bg-white px-2 py-1.5 text-left
    hover:border-orange-300 hover:bg-orange-50/50
  `,
  presetChipActive: `
    flex min-w-0 max-w-full flex-col items-start gap-0.5 rounded-md border border-orange-500 bg-orange-50 px-2 py-1.5 text-left
  `,
  presetChipLabel: `text-[11px] font-semibold text-gray-900`,
  presetChipMeta: `text-[10px] font-medium text-gray-500`,
  dataNotice: `
    mt-5 flex flex-col gap-2 rounded-md border border-blue-200 bg-blue-50/90 p-3 sm:flex-row sm:items-start sm:justify-between sm:gap-3
  `,
  dataNoticeText: `min-w-0 text-[11px] leading-relaxed text-blue-950/90`,
  dataNoticeStrong: `font-semibold text-blue-950`,
  dataNoticeCode: `rounded bg-blue-100/80 px-1 py-0.5 font-mono text-[10px] text-blue-900`,
  dataNoticeDismiss: `
    shrink-0 self-end rounded-md border border-blue-300 bg-white px-2 py-1 text-[11px] font-medium text-blue-900
    hover:bg-blue-100/60 sm:self-center
  `,
  modalActions: `mt-4 flex justify-end gap-2`,
  modalCancel: `
    rounded-md border border-gray-300 bg-white px-2 py-1 text-xs font-medium text-gray-800 hover:bg-gray-50
  `,
  modalPrimary: `
    rounded-md bg-orange-500 px-2 py-1 text-xs font-semibold text-white hover:bg-orange-600
  `,
};
