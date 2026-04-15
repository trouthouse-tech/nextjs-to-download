import { createImageGraphicApi } from "@/api/image-creation-studio";
import { LOCAL_USER_ID } from "@/constants/local-user";
import type { AppThunk } from "@/store";
import { loadImageGraphicsThunk } from "./load-image-graphics-thunk";

export type CreateImageGraphicInput = {
  title: string;
  canvasWidthPx: number;
  canvasHeightPx: number;
};

/**
 * Creates a new graphic in `localStorage`, refreshes the list, returns the new id.
 */
export const createImageGraphicThunk = (input: CreateImageGraphicInput): AppThunk<Promise<string | null>> => {
  return async (dispatch) => {
    const title = input.title.trim() || "Untitled graphic";
    const result = await createImageGraphicApi(
      LOCAL_USER_ID,
      title,
      input.canvasWidthPx,
      input.canvasHeightPx,
    );
    if (!result.success || !result.data?.id) {
      return null;
    }
    await dispatch(loadImageGraphicsThunk());
    return result.data.id;
  };
};
