import { describe, expect, it } from "vitest";
import { parseStudioDraftFromMetadata } from "./parse-studio-draft-from-metadata";

describe("parseStudioDraftFromMetadata", () => {
  it("returns null when studioDraft is missing", () => {
    expect(parseStudioDraftFromMetadata({})).toBeNull();
  });

  it("returns null when studioDraft is not a plain object", () => {
    expect(parseStudioDraftFromMetadata({ studioDraft: null })).toBeNull();
    expect(parseStudioDraftFromMetadata({ studioDraft: "x" })).toBeNull();
    expect(parseStudioDraftFromMetadata({ studioDraft: [] })).toBeNull();
    expect(parseStudioDraftFromMetadata({ studioDraft: 1 })).toBeNull();
  });

  it("returns null when tsx is missing, empty, or whitespace only", () => {
    expect(parseStudioDraftFromMetadata({ studioDraft: {} })).toBeNull();
    expect(parseStudioDraftFromMetadata({ studioDraft: { tsx: "" } })).toBeNull();
    expect(parseStudioDraftFromMetadata({ studioDraft: { tsx: "  \n" } })).toBeNull();
  });

  it("returns null when only legacy previewHtml has content", () => {
    expect(
      parseStudioDraftFromMetadata({ studioDraft: { tsx: "", previewHtml: "<p>x</p>" } }),
    ).toBeNull();
  });

  it("returns null when tsx is not a string", () => {
    expect(
      parseStudioDraftFromMetadata({ studioDraft: { tsx: 123, previewHtml: "<p>hi</p>" } }),
    ).toBeNull();
  });

  it("returns tsx when present (ignores previewHtml)", () => {
    expect(
      parseStudioDraftFromMetadata({
        studioDraft: { tsx: "export default () => null", previewHtml: null },
      }),
    ).toEqual({ tsx: "export default () => null" });

    expect(
      parseStudioDraftFromMetadata({
        studioDraft: { tsx: "const x = 1", previewHtml: "<div/>" },
      }),
    ).toEqual({ tsx: "const x = 1" });
  });
});
