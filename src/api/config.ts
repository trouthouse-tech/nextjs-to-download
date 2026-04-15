/**
 * Reserved for optional future localhost tooling only.
 * This app persists data via {@link src/api/image-creation-studio} wrappers over `localStorage`, not HTTP.
 */
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:3000";
