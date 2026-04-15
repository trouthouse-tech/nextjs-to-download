import type { ApiResponse } from "@/api/types";
import { readGraphicsVault, writeGraphicsVault } from "./persisted-graphics";

export type PatchImageGraphicStudioDraftData = {
  id: string;
  metadata: Record<string, unknown>;
  updatedAt: string;
};

/**
 * Merges TSX into `metadata.studioDraft` for one graphic.
 */
export const patchImageGraphicStudioDraft = async (
  graphicId: string,
  userId: string,
  tsx: string,
): Promise<ApiResponse<PatchImageGraphicStudioDraftData>> => {
  try {
    if (typeof window === "undefined") {
      return { success: false, error: "localStorage is only available in the browser" };
    }
    const { graphics } = readGraphicsVault();
    const idx = graphics.findIndex((g) => g.id === graphicId && g.userId === userId);
    if (idx === -1) {
      return { success: false, error: "Graphic not found" };
    }
    const prev = graphics[idx];
    const metadata: Record<string, unknown> = {
      ...prev.metadata,
      studioDraft: { tsx },
    };
    const updatedAt = new Date().toISOString();
    const next = { ...prev, metadata, updatedAt };
    const copy = [...graphics];
    copy[idx] = next;
    writeGraphicsVault(copy);
    return {
      success: true,
      data: { id: graphicId, metadata, updatedAt },
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
};
