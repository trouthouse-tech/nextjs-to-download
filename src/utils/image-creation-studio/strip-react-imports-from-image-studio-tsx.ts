/**
 * Removes common React import lines so @babel/standalone does not emit unsupported `require()` for other specifiers.
 */
export const stripReactImportsFromImageStudioTsx = (tsx: string): string => {
  const lines = tsx.split("\n");
  const next: string[] = [];
  for (const line of lines) {
    const t = line.trim();
    if (/^import\s+type\s+.+from\s+['"]react['"]\s*;?$/.test(t)) continue;
    if (/^import\s+React\s+from\s+['"]react['"]\s*;?$/.test(t)) continue;
    if (/^import\s+\*\s+as\s+React\s+from\s+['"]react['"]\s*;?$/.test(t)) continue;
    next.push(line);
  }
  return next.join("\n");
};
