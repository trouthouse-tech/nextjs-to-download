import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ImageGraphic } from "@/model";

const emptyGraphic = (): ImageGraphic => ({
  id: "",
  userId: "",
  title: "",
  canvasWidthPx: 960,
  canvasHeightPx: 540,
  metadata: {},
  createdAt: "",
  updatedAt: "",
});

const initialState: ImageGraphic = emptyGraphic();

const currentImageGraphicSlice = createSlice({
  name: "currentImageGraphic",
  initialState,
  reducers: {
    setCurrentImageGraphic: (_state, action: PayloadAction<ImageGraphic>) => action.payload,
    resetCurrentImageGraphic: () => emptyGraphic(),
  },
});

export const CurrentImageGraphicActions = currentImageGraphicSlice.actions;
export default currentImageGraphicSlice.reducer;
