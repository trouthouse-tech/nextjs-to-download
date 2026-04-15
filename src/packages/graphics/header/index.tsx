"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store";
import { StudioBuilderActions } from "@/store/builders/studioBuilder";
import { loadImageGraphicsThunk } from "@/store/thunks";

/**
 * Primary “New graphic” control; opens the create modal via `studioBuilder`.
 */
export const GraphicsListNewGraphicButton = () => {
  const dispatch = useAppDispatch();

  return (
    <button type="button" className={styles.addBtn} onClick={() => dispatch(StudioBuilderActions.openCreateGraphicModal())}>
      <Plus className={styles.addIcon} aria-hidden />
      New graphic
    </button>
  );
};

/**
 * List page chrome above the table: subtext, toolbar, load/error.
 */
export const GraphicsListHeader = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const listLoadStatus = useAppSelector((s) => s.studioBuilder.listLoadStatus);
  const listError = useAppSelector((s) => s.studioBuilder.listError);

  useEffect(() => {
    void dispatch(loadImageGraphicsThunk());
  }, [dispatch]);

  useEffect(() => {
    router.prefetch("/studio");
  }, [router]);

  return (
    <>
      <div className={styles.subtextBar}>
        <p className={styles.subtext}>
          Data lives in your browser ({`localStorage`}). See README for the storage key. Optional{" "}
          <code className={styles.code}>NEXT_PUBLIC_API_BASE_URL</code> defaults to localhost for future tooling only.
        </p>
      </div>

      {listLoadStatus === "loading" ? <p className={styles.muted}>Loading…</p> : null}
      {listError ? <p className={styles.errorText}>{listError}</p> : null}
    </>
  );
};

const styles = {
  subtextBar: `shrink-0 border-b border-gray-200 bg-white px-4 py-2`,
  subtext: `text-xs text-gray-600`,
  code: `rounded bg-gray-100 px-1 py-0.5 font-mono text-[11px]`,
  addBtn: `
    inline-flex shrink-0 items-center gap-1 rounded-md border border-orange-500 bg-orange-500 px-2 py-1 text-xs font-medium
    text-white hover:bg-orange-600
  `,
  addIcon: `h-3.5 w-3.5`,
  muted: `px-4 text-xs text-gray-500`,
  errorText: `px-4 text-xs text-red-600`,
};
