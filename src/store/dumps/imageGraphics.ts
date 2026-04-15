import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ImageGraphic } from "@/model";

type InitialState = Record<string, ImageGraphic>;

const initialState: InitialState = {};

const imageGraphicsSlice = createSlice({
  name: "imageGraphics",
  initialState,
  reducers: {
    upsertImageGraphics: (state, action: PayloadAction<ImageGraphic[]>) => {
      for (const g of action.payload) {
        state[g.id] = g;
      }
    },
    removeImageGraphics: (state, action: PayloadAction<string[]>) => {
      for (const id of action.payload) {
        delete state[id];
      }
    },
    resetImageGraphics: () => initialState,
  },
});

export const ImageGraphicsActions = imageGraphicsSlice.actions;
export default imageGraphicsSlice.reducer;
