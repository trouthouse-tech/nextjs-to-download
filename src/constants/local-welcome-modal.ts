/**
 * `localStorage` flag: user dismissed the localhost welcome + security notice.
 * Cleared with other site data for this origin (e.g. “Clear storage” for localhost).
 */
export const LOCAL_WELCOME_MODAL_DISMISSED_KEY = "nextjs-to-download:local-welcome-dismissed:v1";

/**
 * `sessionStorage` flag: hide the welcome for this browser tab until the tab is closed.
 */
export const LOCAL_WELCOME_MODAL_SESSION_DISMISSED_KEY = "nextjs-to-download:local-welcome-session-dismissed:v1";

/**
 * Whether the current host looks like a local dev server (not production deploy).
 */
export const isLocalDevHostname = (hostname: string): boolean => {
  const h = hostname.trim().toLowerCase();
  if (h === "localhost" || h === "127.0.0.1" || h === "::1" || h === "[::1]") {
    return true;
  }
  if (h.endsWith(".localhost")) {
    return true;
  }
  return false;
};
