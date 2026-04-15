import { combineReducers } from "@reduxjs/toolkit";
import { appReducer } from "./appSlice";
import currentImageGraphicReducer from "./current/currentImageGraphic";
import imageGraphicsReducer from "./dumps/imageGraphics";
import studioBuilderReducer from "./builders/studioBuilder";

export const rootReducer = combineReducers({
  app: appReducer,
  currentImageGraphic: currentImageGraphicReducer,
  imageGraphics: imageGraphicsReducer,
  studioBuilder: studioBuilderReducer,
});
