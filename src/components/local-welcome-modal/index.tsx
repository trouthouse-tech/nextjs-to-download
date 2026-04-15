"use client";

import { useCallback, useEffect, useId, useState } from "react";
import { getStorageKeyForDocs } from "@/api/image-creation-studio";
import {
  isLocalDevHostname,
  LOCAL_WELCOME_MODAL_DISMISSED_KEY,
  LOCAL_WELCOME_MODAL_SESSION_DISMISSED_KEY,
} from "@/constants/local-welcome-modal";

const DISMISSED_VALUE = "1";

/**
 * One-time (until storage cleared) welcome for **local** hostnames: how data is stored,
 * security expectations, and that the app does not phone home for persistence.
 */
export const LocalWelcomeModal = () => {
  const titleId = useId();
  const [open, setOpen] = useState(false);

  const readPermanentDismissed = useCallback((): boolean => {
    if (typeof window === "undefined") {
      return true;
    }
    try {
      return window.localStorage.getItem(LOCAL_WELCOME_MODAL_DISMISSED_KEY) === DISMISSED_VALUE;
    } catch {
      return true;
    }
  }, []);

  const readSessionDismissed = useCallback((): boolean => {
    if (typeof window === "undefined") {
      return true;
    }
    try {
      return window.sessionStorage.getItem(LOCAL_WELCOME_MODAL_SESSION_DISMISSED_KEY) === DISMISSED_VALUE;
    } catch {
      return true;
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const host = window.location.hostname;
    if (!isLocalDevHostname(host)) {
      return;
    }
    if (readPermanentDismissed() || readSessionDismissed()) {
      return;
    }
    setOpen(true);
  }, [readPermanentDismissed, readSessionDismissed]);

  useEffect(() => {
    if (!open || typeof document === "undefined") {
      return;
    }
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const handleDismissPermanent = () => {
    if (typeof window !== "undefined") {
      try {
        window.localStorage.setItem(LOCAL_WELCOME_MODAL_DISMISSED_KEY, DISMISSED_VALUE);
      } catch {
        /* ignore quota / private mode */
      }
    }
    setOpen(false);
  };

  const handleDismissSession = () => {
    if (typeof window !== "undefined") {
      try {
        window.sessionStorage.setItem(LOCAL_WELCOME_MODAL_SESSION_DISMISSED_KEY, DISMISSED_VALUE);
      } catch {
        /* ignore private mode */
      }
    }
    setOpen(false);
  };

  if (!open) {
    return null;
  }

  const graphicsKey = getStorageKeyForDocs();

  return (
    <div className={styles.scrim} role="presentation">
      <div
        className={styles.cardWrap}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id={titleId} className={styles.title}>
          You’re on localhost
        </h2>
        <p className={styles.lead}>
          This app is meant to run on your machine for layout / TSX preview work. Nothing here replaces legal,
          compliance, or security review for how <em className={styles.em}>you</em> use it—it’s local and 100% on you.
        </p>

        <div className={styles.sections}>
          <section aria-labelledby={`${titleId}-data`}>
            <h3 id={`${titleId}-data`} className={styles.h3}>
              Where your data lives
            </h3>
            <ul className={styles.list}>
              <li className={styles.li}>
                Graphics and saved studio drafts are stored in your browser’s{" "}
                <code className={styles.code}>localStorage</code> under{" "}
                <code className={styles.code}>{graphicsKey}</code>. This build does not send that payload to a backend
                for persistence.
              </li>
              <li className={styles.li}>
                If you clear site data / storage for this origin (common when resetting localhost), your graphics and
                this notice’s “don’t show again” flag are removed—you’ll see this dialog again. Closing the browser tab
                clears a temporary “hide for now” choice.
              </li>
              <li className={styles.li}>
                Deployed sites (e.g. Vercel) behave the same{" "}
                <strong className={styles.strong}>per visitor’s browser</strong>: still no server-side account store in
                this repo—only static assets and client JS.
              </li>
            </ul>
          </section>

          <section aria-labelledby={`${titleId}-preview`}>
            <h3 id={`${titleId}-preview`} className={styles.h3}>
              Studio / TSX preview (security in one breath)
            </h3>
            <ul className={styles.list}>
              <li className={styles.li}>
                The studio <strong className={styles.strong}>compiles TSX in the browser</strong> and runs the result in
                an iframe with Tailwind + React loaded from public CDNs. That is arbitrary code execution in{" "}
                <em className={styles.em}>your</em> profile—treat pasted or model-generated TSX as{" "}
                <strong className={styles.strong}>trusted input</strong>, not a multi-tenant sandbox.
              </li>
              <li className={styles.li}>
                See <code className={styles.code}>docs/tsx-live-preview-security.md</code> in the repo for the full note
                (iframe sandbox, same-origin caveats, CDN trust).
              </li>
            </ul>
          </section>

          <section aria-labelledby={`${titleId}-reassurance`}>
            <h3 id={`${titleId}-reassurance`} className={styles.h3}>
              What we’re not doing
            </h3>
            <ul className={styles.list}>
              <li className={styles.li}>
                No sign-in, no tenant isolation, no hosted database for your layouts in this app.
              </li>
              <li className={styles.li}>
                Optional <code className={styles.code}>NEXT_PUBLIC_API_BASE_URL</code> exists for future localhost tooling
                only—the default UI does not call it.
              </li>
            </ul>
          </section>
        </div>

        <p className={styles.footer}>
          Open source (MIT), as-is. Use your own judgment; keep backups if drafts matter.
        </p>

        <div className={styles.actions}>
          <button type="button" className={styles.primaryBtn} onClick={handleDismissPermanent}>
            Got it — don’t show again
          </button>
          <button type="button" className={styles.secondaryBtn} onClick={handleDismissSession}>
            Hide until I close this tab
          </button>
        </div>
        <p className={styles.finePrint}>
          “Don’t show again” saves <code className={styles.code}>{LOCAL_WELCOME_MODAL_DISMISSED_KEY}</code> in{" "}
          <code className={styles.code}>localStorage</code>. “Hide until I close this tab” uses{" "}
          <code className={styles.code}>{LOCAL_WELCOME_MODAL_SESSION_DISMISSED_KEY}</code> in{" "}
          <code className={styles.code}>sessionStorage</code>. Clear site data for this origin to reset the permanent
          flag.
        </p>
      </div>
    </div>
  );
};

const styles = {
  scrim: `
    fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4
    backdrop-blur-[2px]
  `,
  cardWrap: `
    max-h-[min(90vh,720px)] w-full max-w-lg overflow-y-auto rounded-lg border border-gray-200 bg-white p-5 shadow-xl
  `,
  title: `
    text-lg font-semibold text-gray-900
  `,
  lead: `
    mt-2 text-sm text-gray-600 leading-relaxed
  `,
  sections: `
    mt-4 space-y-4
  `,
  h3: `
    text-xs font-semibold uppercase tracking-wide text-gray-500
  `,
  list: `
    mt-2 list-disc space-y-2 pl-5 text-sm text-gray-700 leading-relaxed
  `,
  li: `
    marker:text-gray-400
  `,
  footer: `
    mt-4 text-xs text-gray-500 leading-relaxed
  `,
  actions: `
    mt-5 flex flex-wrap items-center gap-2
  `,
  primaryBtn: `
    inline-flex items-center justify-center rounded-md border border-orange-500 bg-orange-500 px-4 py-2 text-sm
    font-medium text-white hover:bg-orange-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400
    focus-visible:ring-offset-2
  `,
  secondaryBtn: `
    inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium
    text-gray-800 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400
    focus-visible:ring-offset-2
  `,
  finePrint: `
    mt-3 text-[11px] text-gray-500 leading-relaxed
  `,
  code: `
    rounded bg-gray-100 px-1 py-0.5 text-[11px] font-mono text-gray-800
  `,
  em: `
    not-italic font-semibold text-gray-800
  `,
  strong: `
    font-semibold text-gray-900
  `,
};
