import * as Babel from "@babel/standalone";
import { stripReactImportsFromImageStudioTsx } from "./strip-react-imports-from-image-studio-tsx";

/**
 * Transpile TSX to CommonJS-style JS for execution inside a preview iframe.
 */
export const compileImageStudioTsx = (tsx: string): { code: string } | { error: string } => {
  const trimmed = tsx.trim();
  if (!trimmed) {
    return { error: "Empty TSX" };
  }
  try {
    const source = stripReactImportsFromImageStudioTsx(trimmed);
    const result = Babel.transform(source, {
      filename: "image-studio-preview.tsx",
      presets: [
        ["typescript", { isTSX: true, allExtensions: true }],
        "react",
        ["env", { modules: "commonjs", targets: { chrome: "120" } }],
      ],
    });
    if (!result?.code?.trim()) {
      return { error: "Compiler produced no output" };
    }
    return { code: result.code };
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    return { error: message };
  }
};
