/**
 * TSX saved with a graphic in `localStorage` under `metadata.studioDraft`.
 */
export type StudioDraftFromMetadata = {
  tsx: string;
};

/**
 * Reads `metadata.studioDraft` from persisted graphic metadata.
 *
 * The API layer stores an object like `{ tsx: string }` on the graphic.
 * Legacy records may include `previewHtml`; it is ignored.
 * Returns `null` if there is no non-empty `tsx` string.
 */
export const parseStudioDraftFromMetadata = (
  metadata: Record<string, unknown>,
): StudioDraftFromMetadata | null => {
  const raw = metadata.studioDraft;
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    return null;
  }
  const o = raw as { tsx?: unknown };
  const tsx = typeof o.tsx === "string" ? o.tsx : "";
  if (!tsx.trim()) {
    return null;
  }
  return { tsx };
};
