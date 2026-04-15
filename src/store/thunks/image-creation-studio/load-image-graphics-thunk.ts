import { listImageGraphicsApi } from "@/api/image-creation-studio";
import { LOCAL_USER_ID } from "@/constants/local-user";
import type { AppThunk } from "@/store";
import { StudioBuilderActions } from "@/store/builders/studioBuilder";
import { ImageGraphicsActions } from "@/store/dumps/imageGraphics";

type Status = Promise<200 | 400 | 500>;

/**
 * Loads all image graphics for the local user from `localStorage`.
 */
export const loadImageGraphicsThunk = (): AppThunk<Status> => {
  return async (dispatch): Status => {
    dispatch(StudioBuilderActions.setListLoadStatus("loading"));
    dispatch(StudioBuilderActions.setListError(null));
    const result = await listImageGraphicsApi(LOCAL_USER_ID);
    if (!result.success || !result.data) {
      dispatch(StudioBuilderActions.setListLoadStatus("error"));
      dispatch(StudioBuilderActions.setListError(result.error ?? "Failed to load"));
      return 500;
    }
    dispatch(ImageGraphicsActions.upsertImageGraphics(result.data.graphics));
    dispatch(StudioBuilderActions.setListLoadStatus("idle"));
    return 200;
  };
};
