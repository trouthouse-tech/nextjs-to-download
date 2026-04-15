/**
 * Escape text embedded inside an HTML inline script element so closing tags cannot break out.
 */
export const escapeForInlineScript = (value: string): string => {
  return value.replace(/<\/script/gi, "<\\/script");
};
