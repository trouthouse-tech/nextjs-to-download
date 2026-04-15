"use client";

import { ImageCreationStudio } from "@/packages/graphics-studio";

export default function StudioPage() {
  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
      <div className="flex min-h-0 flex-1 flex-col overflow-auto p-4">
        <ImageCreationStudio />
      </div>
    </div>
  );
}
