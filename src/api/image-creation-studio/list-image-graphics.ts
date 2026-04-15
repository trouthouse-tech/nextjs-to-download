import type { ImageGraphic } from "@/model";
import type { ApiResponse } from "@/api/types";
import { readGraphicsVault } from "./persisted-graphics";

/**
 * Lists image graphics for a user from `localStorage` (newest first).
 */
export const listImageGraphicsApi = async (userId: string): Promise<ApiResponse<{ graphics: ImageGraphic[] }>> => {
  try {
    if (typeof window === "undefined") {
      return { success: false, error: "localStorage is only available in the browser" };
    }
    const { graphics } = readGraphicsVault();
    const filtered = graphics.filter((g) => g.userId === userId);
    filtered.sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : a.updatedAt > b.updatedAt ? -1 : 0));
    return { success: true, data: { graphics: filtered } };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
};
