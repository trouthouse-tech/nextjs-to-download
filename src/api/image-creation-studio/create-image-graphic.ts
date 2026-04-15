import type { ImageGraphic } from "@/model";
import type { ApiResponse } from "@/api/types";
import { readGraphicsVault, writeGraphicsVault } from "./persisted-graphics";

const clampCanvas = (n: number, fallback: number): number => {
  if (!Number.isFinite(n)) return fallback;
  const rounded = Math.round(n);
  if (rounded < 64) return 64;
  if (rounded > 8192) return 8192;
  return rounded;
};

/**
 * Creates a new graphic row in `localStorage`.
 */
export const createImageGraphicApi = async (
  userId: string,
  title: string,
  canvasWidthPx: number,
  canvasHeightPx: number,
): Promise<ApiResponse<{ id: string }>> => {
  try {
    if (typeof window === "undefined") {
      return { success: false, error: "localStorage is only available in the browser" };
    }
    const id =
      typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
        ? crypto.randomUUID()
        : `g-${Date.now()}-${Math.random().toString(16).slice(2)}`;
    const now = new Date().toISOString();
    const w = clampCanvas(canvasWidthPx, 960);
    const h = clampCanvas(canvasHeightPx, 540);
    const next: ImageGraphic = {
      id,
      userId,
      title: title.trim() || "Untitled graphic",
      canvasWidthPx: w,
      canvasHeightPx: h,
      metadata: {},
      createdAt: now,
      updatedAt: now,
    };
    const { graphics } = readGraphicsVault();
    writeGraphicsVault([next, ...graphics]);
    return { success: true, data: { id } };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
};
