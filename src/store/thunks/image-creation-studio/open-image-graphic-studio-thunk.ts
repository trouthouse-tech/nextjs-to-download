import type { ImageGraphic } from "@/model";
import type { AppThunk } from "@/store";
import { CurrentImageGraphicActions } from "@/store/current/currentImageGraphic";

type Result = Promise<200>;

/**
 * Sets the current graphic for the studio (no server ledger in this build).
 */
export const openImageGraphicStudioThunk = (graphic: ImageGraphic): AppThunk<Result> => {
  return async (dispatch): Result => {
    dispatch(CurrentImageGraphicActions.setCurrentImageGraphic(graphic));
    return 200;
  };
};
