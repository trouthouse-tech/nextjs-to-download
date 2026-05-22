/**
 * Common social / ad canvas sizes, pitch-deck slide sizes, and document page presets
 * (approximate platform recommendations). Users pick one at graphic creation; dimensions are
 * stored on the graphic.
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
  {
    id: "pitch-widescreen-1080",
    label: "Widescreen slide (16:9, 1080p)",
    platform: "Pitch deck",
    orientation: "landscape",
    widthPx: 1920,
    heightPx: 1080,
  },
  {
    id: "pitch-widescreen-720",
    label: "Widescreen slide (16:9, 720p)",
    platform: "Pitch deck",
    orientation: "landscape",
    widthPx: 1280,
    heightPx: 720,
  },
  {
    id: "pitch-classic-43",
    label: "Classic slide (4:3)",
    platform: "Pitch deck",
    orientation: "landscape",
    widthPx: 1024,
    heightPx: 768,
  },
  {
    id: "resume-us-letter-96dpi",
    label: "US Letter (8.5×11 in @ 96dpi)",
    platform: "Resume & documents",
    orientation: "portrait",
    widthPx: 816,
    heightPx: 1056,
  },
  {
    id: "resume-a4-96dpi",
    label: "A4 (210×297 mm @ 96dpi)",
    platform: "Resume & documents",
    orientation: "portrait",
    widthPx: 794,
    heightPx: 1123,
  },
];
