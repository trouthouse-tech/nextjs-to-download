import { escapeForInlineScript } from "./escape-for-inline-script";

const PREVIEW_REACT_UMD_VERSION = "18.3.1";

export type ImageStudioPreviewDimensions = {
  widthPx: number;
  heightPx: number;
};

const DEFAULT_PREVIEW_DIM: ImageStudioPreviewDimensions = { widthPx: 960, heightPx: 540 };

const clampDim = (n: number, fallback: number): number => {
  if (!Number.isFinite(n)) return fallback;
  const r = Math.round(n);
  if (r < 64) return 64;
  if (r > 8192) return 8192;
  return r;
};

const previewRequireShim = `
function __imageStudioPreviewRequire(specifier) {
  var React = window.React;
  if (!React) throw new Error('React failed to load in preview');
  if (specifier === 'react') {
    var m = { __esModule: true, default: React };
    for (var key in React) {
      if (Object.prototype.hasOwnProperty.call(React, key)) m[key] = React[key];
    }
    return m;
  }
  if (specifier === 'react/jsx-runtime' || specifier === 'react/jsx-dev-runtime') {
    return {
      __esModule: true,
      jsx: function (type, props, key) {
        return React.createElement.apply(React, arguments);
      },
      jsxs: function (type, props, key) {
        return React.createElement.apply(React, arguments);
      },
      Fragment: React.Fragment,
    };
  }
  throw new Error('Unsupported import in TSX preview (only react is available): ' + String(specifier));
}
`.trim();

/**
 * Build a full HTML document for the preview iframe: Tailwind Play CDN, React UMD, and boot logic for compiled CJS.
 */
export const buildTsxReactPreviewSrcDoc = (
  compiledJs: string,
  dimensions: ImageStudioPreviewDimensions = DEFAULT_PREVIEW_DIM,
): string => {
  const w = clampDim(dimensions.widthPx, DEFAULT_PREVIEW_DIM.widthPx);
  const h = clampDim(dimensions.heightPx, DEFAULT_PREVIEW_DIM.heightPx);
  const safeCompiled = escapeForInlineScript(compiledJs);
  const reactUrl = `https://unpkg.com/react@${PREVIEW_REACT_UMD_VERSION}/umd/react.production.min.js`;
  const reactDomUrl = `https://unpkg.com/react-dom@${PREVIEW_REACT_UMD_VERSION}/umd/react-dom.production.min.js`;

  const bootScript = `
${previewRequireShim}
(function () {
  var rootEl = document.getElementById('root');
  function showErr(err) {
    var msg = err && err.stack ? err.stack : String(err && err.message ? err.message : err);
    if (rootEl) {
      rootEl.innerHTML =
        '<pre style="padding:12px;color:#b91c1c;font:12px/1.4 ui-monospace,monospace;white-space:pre-wrap;word-break:break-word">' +
        msg.replace(/</g, '&lt;') +
        '</pre>';
    }
  }
  window.onerror = function (message, source, lineno, colno, err) {
    showErr(err || message);
    return true;
  };
  try {
    var require = __imageStudioPreviewRequire;
    var exports = {};
    var module = { exports: exports };
    ${safeCompiled}
    var Comp =
      module.exports && module.exports.__esModule
        ? module.exports.default
        : module.exports.default || module.exports;
    if (!Comp) {
      showErr('No default export — export default function MyComponent() { ... }');
      return;
    }
    var React = window.React;
    var ReactDOM = window.ReactDOM;
    if (!React || !ReactDOM) {
      showErr('React UMD failed to load (check network or CDN). Preview iframe uses React ${PREVIEW_REACT_UMD_VERSION} UMD because React 19 has no official UMD on unpkg.');
      return;
    }
    if (typeof ReactDOM.createRoot === 'function') {
      ReactDOM.createRoot(rootEl).render(React.createElement(Comp));
    } else if (typeof ReactDOM.render === 'function') {
      ReactDOM.render(React.createElement(Comp), rootEl);
    } else {
      showErr('ReactDOM has neither createRoot nor render');
    }
  } catch (e) {
    showErr(e);
  }
})();
`.trim();

  const safeBoot = escapeForInlineScript(bootScript);

  return `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/><meta name="viewport" content="width=${w}"/><script src="https://cdn.tailwindcss.com"></script><script crossorigin src="${reactUrl}"></script><script crossorigin src="${reactDomUrl}"></script></head><body class="min-h-screen bg-white text-gray-900 antialiased"><div id="root" style="width:${w}px;min-height:${h}px;box-sizing:border-box"></div><script>${safeBoot}</script></body></html>`;
};
