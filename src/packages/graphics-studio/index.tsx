"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store";
import { StudioBuilderActions } from "@/store/builders/studioBuilder";
import { parseStudioDraftFromMetadata } from "@/utils/image-creation-studio";
import { ImageCreationStudioBuilderColumn } from "./builder-column";
import { ImageCreationStudioEditorColumn } from "./editor-column";

/**
 * Studio for `currentImageGraphic`: TSX preview, save to localStorage, export.
 */
export const ImageCreationStudio = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const graphic = useAppSelector((s) => s.currentImageGraphic);

  useEffect(() => {
    if (!graphic.id) {
      dispatch(StudioBuilderActions.resetStudioEditorState());
      void router.replace("/");
      return;
    }
    const draft = parseStudioDraftFromMetadata(graphic.metadata);
    dispatch(
      StudioBuilderActions.hydrateStudioForGraphic({
        tsx: draft?.tsx ?? "",
      }),
    );
  }, [graphic.id, dispatch, router]);

  if (!graphic.id) {
    return null;
  }

  return (
    <div className={styles.root}>
      <div className={styles.shell}>
        <div className={styles.editorPane}>
          <ImageCreationStudioEditorColumn />
        </div>

        <div className={styles.divider} aria-hidden />

        <div className={styles.builderPane}>
          <ImageCreationStudioBuilderColumn />
        </div>
      </div>
    </div>
  );
};

const styles = {
  root: `
    flex w-full min-w-0 flex-col
    max-lg:flex-none max-lg:min-h-0
    lg:min-h-0 lg:flex-1
  `,
  shell: `
    flex w-full min-w-0 flex-col gap-4 bg-zinc-50
    max-lg:flex-none
    lg:flex-1 lg:min-h-0 lg:flex-row lg:items-stretch lg:gap-0 lg:overflow-hidden
  `,
  divider: `
    hidden lg:block w-px shrink-0 bg-gray-300 self-stretch mx-2
  `,
  editorPane: `
    flex min-w-0 flex-col overflow-hidden rounded-sm border border-gray-200 bg-white
    max-lg:w-full max-lg:flex-none max-lg:shrink-0
    lg:min-h-0 lg:w-1/2 lg:max-w-[50%]
  `,
  builderPane: `
    flex min-w-0 flex-1 flex-col overflow-hidden rounded-sm border border-gray-200 bg-white
    max-lg:w-full max-lg:flex-none max-lg:shrink-0
    lg:min-h-0
  `,
};
