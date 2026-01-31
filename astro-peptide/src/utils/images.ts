export const toOptimizedImage = (src: string): string => {
  if (!src) return src;
  if (/^https?:\/\//i.test(src)) return src;
  return src.replace(/\.png$/i, '.webp');
};
