import type { AppThunk } from "@/store";
import { openImageGraphicStudioThunk } from "./open-image-graphic-studio-thunk";

type Result = Promise<200 | 400>;

/**
 * Opens the studio for a graphic that is already in the `imageGraphics` dump.
 */
export const openImageGraphicStudioByIdThunk = (graphicId: string): AppThunk<Result> => {
  return async (dispatch, getState): Result => {
    const graphic = getState().imageGraphics[graphicId];
    if (!graphic) {
      return 400;
    }
    await dispatch(openImageGraphicStudioThunk(graphic));
    return 200;
  };
};
