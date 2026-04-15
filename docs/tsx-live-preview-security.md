# TSX live preview — security notes

The preview **transpiles TSX with `@babel/standalone` and runs the result** in an iframe that loads React UMD and Tailwind Play CDN. That is **arbitrary code execution in the user’s browser** for whatever string is in the editor.

- The iframe uses `sandbox="allow-scripts allow-same-origin"` so the parent can print and capture PNGs. **Do not treat this as a strong isolation boundary** for untrusted tenants.
- Only `react` is shimmed for `require`; other imports fail by design. That limits accidental complexity, **not** malicious use of DOM, `fetch`, timers, etc.

**This build is intended for local / trusted use.** If strangers can supply TSX, you need a different architecture (separate origin, no cookies, server-side rendering with limits, or static templates only).
