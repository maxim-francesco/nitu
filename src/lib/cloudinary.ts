export const getOptimizedImageUrl = (url: string, width: number, height: number): string => {
  if (!url || !url.includes('res.cloudinary.com')) return url;
  return url.replace('/upload/', `/upload/c_fill,w_${width},h_${height},f_auto,q_auto/`);
};
