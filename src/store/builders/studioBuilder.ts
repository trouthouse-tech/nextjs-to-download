import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const DEFAULT_CREATE_CANVAS_W = 1080;
const DEFAULT_CREATE_CANVAS_H = 1080;
const DEFAULT_CREATE_PRESET_ID = "ig-square";

type StudioBuilderState = {
  tsxDraft: string;
  isSavingDraft: boolean;
  isDownloadingPreviewPng: boolean;
  tsxBaselineForPreview: string;
  listLoadStatus: "idle" | "loading" | "error";
  listError: string | null;
  isCreateGraphicModalOpen: boolean;
  createGraphicTitleDraft: string;
  createGraphicCanvasWidthPx: number;
  createGraphicCanvasHeightPx: number;
  createGraphicSelectedPresetId: string | null;
};

const editorInitial = (): Pick<
  StudioBuilderState,
  "tsxDraft" | "isSavingDraft" | "isDownloadingPreviewPng" | "tsxBaselineForPreview"
> => ({
  tsxDraft: "",
  isSavingDraft: false,
  isDownloadingPreviewPng: false,
  tsxBaselineForPreview: "",
});

const initialState: StudioBuilderState = {
  ...editorInitial(),
  listLoadStatus: "idle",
  listError: null,
  isCreateGraphicModalOpen: false,
  createGraphicTitleDraft: "",
  createGraphicCanvasWidthPx: DEFAULT_CREATE_CANVAS_W,
  createGraphicCanvasHeightPx: DEFAULT_CREATE_CANVAS_H,
  createGraphicSelectedPresetId: DEFAULT_CREATE_PRESET_ID,
};

const studioBuilderSlice = createSlice({
  name: "studioBuilder",
  initialState,
  reducers: {
    hydrateStudioForGraphic: (state, action: PayloadAction<{ tsx: string }>) => {
      state.tsxDraft = action.payload.tsx;
      state.tsxBaselineForPreview = action.payload.tsx;
    },
    /** Clears studio editor session fields; keeps list + create-modal state. */
    resetStudioEditorState: (state) => {
      const next = editorInitial();
      state.tsxDraft = next.tsxDraft;
      state.isSavingDraft = next.isSavingDraft;
      state.isDownloadingPreviewPng = next.isDownloadingPreviewPng;
      state.tsxBaselineForPreview = next.tsxBaselineForPreview;
    },
    setTsxDraft: (state, action: PayloadAction<string>) => {
      state.tsxDraft = action.payload;
    },
    alignTsxBaselineToCurrentDraft: (state) => {
      state.tsxBaselineForPreview = state.tsxDraft;
    },
    setIsSavingDraft: (state, action: PayloadAction<boolean>) => {
      state.isSavingDraft = action.payload;
    },
    setIsDownloadingPreviewPng: (state, action: PayloadAction<boolean>) => {
      state.isDownloadingPreviewPng = action.payload;
    },
    syncTsxBaselineAfterSave: (state) => {
      state.tsxBaselineForPreview = state.tsxDraft;
    },
    setListLoadStatus: (state, action: PayloadAction<StudioBuilderState["listLoadStatus"]>) => {
      state.listLoadStatus = action.payload;
    },
    setListError: (state, action: PayloadAction<string | null>) => {
      state.listError = action.payload;
    },
    openCreateGraphicModal: (state) => {
      state.isCreateGraphicModalOpen = true;
      state.createGraphicTitleDraft = "";
      state.createGraphicCanvasWidthPx = DEFAULT_CREATE_CANVAS_W;
      state.createGraphicCanvasHeightPx = DEFAULT_CREATE_CANVAS_H;
      state.createGraphicSelectedPresetId = DEFAULT_CREATE_PRESET_ID;
    },
    closeCreateGraphicModal: (state) => {
      state.isCreateGraphicModalOpen = false;
    },
    setCreateGraphicTitleDraft: (state, action: PayloadAction<string>) => {
      state.createGraphicTitleDraft = action.payload;
    },
    setCreateGraphicCanvasWidthPx: (state, action: PayloadAction<number>) => {
      state.createGraphicCanvasWidthPx = action.payload;
      state.createGraphicSelectedPresetId = null;
    },
    setCreateGraphicCanvasHeightPx: (state, action: PayloadAction<number>) => {
      state.createGraphicCanvasHeightPx = action.payload;
      state.createGraphicSelectedPresetId = null;
    },
    applyCreateGraphicPreset: (
      state,
      action: PayloadAction<{ id: string; widthPx: number; heightPx: number }>,
    ) => {
      state.createGraphicSelectedPresetId = action.payload.id;
      state.createGraphicCanvasWidthPx = action.payload.widthPx;
      state.createGraphicCanvasHeightPx = action.payload.heightPx;
    },
  },
});

export const StudioBuilderActions = studioBuilderSlice.actions;
export default studioBuilderSlice.reducer;
