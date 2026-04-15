import type { ImageGraphic } from "@/model";

export const IMAGE_GRAPHICS_STORAGE_KEY = "nextjs-to-download:image-graphics:v1";

type Vault = { graphics: ImageGraphic[] };

const emptyVault = (): Vault => ({ graphics: [] });

const parseVault = (raw: string | null): Vault => {
  if (!raw) return emptyVault();
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return emptyVault();
    const g = (parsed as { graphics?: unknown }).graphics;
    if (!Array.isArray(g)) return emptyVault();
    const graphics = g.map(normalizeImageGraphic).filter((x): x is ImageGraphic => x !== null);
    return { graphics };
  } catch {
    return emptyVault();
  }
};

const DEFAULT_CANVAS_W = 960;
const DEFAULT_CANVAS_H = 540;

const isImageGraphicLike = (value: unknown): value is Omit<ImageGraphic, "canvasWidthPx" | "canvasHeightPx"> & {
  canvasWidthPx?: unknown;
  canvasHeightPx?: unknown;
} => {
  if (!value || typeof value !== "object") return false;
  const o = value as Record<string, unknown>;
  return (
    typeof o.id === "string" &&
    typeof o.userId === "string" &&
    typeof o.title === "string" &&
    typeof o.createdAt === "string" &&
    typeof o.updatedAt === "string" &&
    typeof o.metadata === "object" &&
    o.metadata !== null &&
    !Array.isArray(o.metadata)
  );
};

const clampCanvas = (n: unknown, fallback: number): number => {
  if (typeof n !== "number" || !Number.isFinite(n)) return fallback;
  const rounded = Math.round(n);
  if (rounded < 64) return 64;
  if (rounded > 8192) return 8192;
  return rounded;
};

/** Ensures canvas fields exist (older vault rows may omit them). */
export const normalizeImageGraphic = (value: unknown): ImageGraphic | null => {
  if (!isImageGraphicLike(value)) return null;
  const o = value as ImageGraphic;
  return {
    ...o,
    canvasWidthPx: clampCanvas(o.canvasWidthPx, DEFAULT_CANVAS_W),
    canvasHeightPx: clampCanvas(o.canvasHeightPx, DEFAULT_CANVAS_H),
  };
};

export const readGraphicsVault = (): Vault => {
  if (typeof window === "undefined") return emptyVault();
  return parseVault(window.localStorage.getItem(IMAGE_GRAPHICS_STORAGE_KEY));
};

export const writeGraphicsVault = (graphics: ImageGraphic[]): void => {
  if (typeof window === "undefined") return;
  const vault: Vault = { graphics };
  window.localStorage.setItem(IMAGE_GRAPHICS_STORAGE_KEY, JSON.stringify(vault));
};

/** Exposed for README / debugging; same key the API layer uses. */
export const getStorageKeyForDocs = (): string => IMAGE_GRAPHICS_STORAGE_KEY;
