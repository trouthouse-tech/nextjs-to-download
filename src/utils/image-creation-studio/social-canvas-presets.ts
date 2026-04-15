/**
 * Common social / ad canvas sizes (approximate platform recommendations).
 * Users pick one at graphic creation; dimensions are stored on the graphic.
 */
export type SocialCanvasPreset = {
  id: string;
  label: string;
  platform: string;
  orientation: "landscape" | "portrait" | "square";
  widthPx: number;
  heightPx: number;
};

export const SOCIAL_CANVAS_PRESETS: SocialCanvasPreset[] = [
  {
    id: "ig-square",
    label: "Post (1:1)",
    platform: "Instagram",
    orientation: "square",
    widthPx: 1080,
    heightPx: 1080,
  },
  {
    id: "ig-portrait",
    label: "Portrait (4:5)",
    platform: "Instagram",
    orientation: "portrait",
    widthPx: 1080,
    heightPx: 1350,
  },
  {
    id: "ig-story",
    label: "Story / Reels (9:16)",
    platform: "Instagram",
    orientation: "portrait",
    widthPx: 1080,
    heightPx: 1920,
  },
  {
    id: "ig-landscape",
    label: "Landscape (1.91:1)",
    platform: "Instagram",
    orientation: "landscape",
    widthPx: 1080,
    heightPx: 566,
  },
  {
    id: "fb-post",
    label: "Feed image",
    platform: "Facebook",
    orientation: "landscape",
    widthPx: 1200,
    heightPx: 630,
  },
  {
    id: "fb-cover",
    label: "Cover photo",
    platform: "Facebook",
    orientation: "landscape",
    widthPx: 820,
    heightPx: 312,
  },
  {
    id: "yt-thumb",
    label: "Thumbnail (16:9)",
    platform: "YouTube",
    orientation: "landscape",
    widthPx: 1280,
    heightPx: 720,
  },
  {
    id: "li-post",
    label: "Shared image",
    platform: "LinkedIn",
    orientation: "landscape",
    widthPx: 1200,
    heightPx: 627,
  },
  {
    id: "li-cover",
    label: "Cover image",
    platform: "LinkedIn",
    orientation: "landscape",
    widthPx: 1584,
    heightPx: 396,
  },
  {
    id: "x-post",
    label: "Post image (16:9)",
    platform: "X (Twitter)",
    orientation: "landscape",
    widthPx: 1600,
    heightPx: 900,
  },
  {
    id: "x-header",
    label: "Header photo (3:1)",
    platform: "X (Twitter)",
    orientation: "landscape",
    widthPx: 1500,
    heightPx: 500,
  },
  {
    id: "tiktok",
    label: "Video (9:16)",
    platform: "TikTok",
    orientation: "portrait",
    widthPx: 1080,
    heightPx: 1920,
  },
  {
    id: "pinterest-pin",
    label: "Standard pin (2:3)",
    platform: "Pinterest",
    orientation: "portrait",
    widthPx: 1000,
    heightPx: 1500,
  },
  {
    id: "reddit-large",
    label: "Large card / banner",
    platform: "Reddit",
    orientation: "landscape",
    widthPx: 1200,
    heightPx: 628,
  },
  {
    id: "og-default",
    label: "Open Graph / link preview",
    platform: "Web",
    orientation: "landscape",
    widthPx: 1200,
    heightPx: 630,
  },
];
