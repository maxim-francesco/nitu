export const getOptimizedImageUrl = (url: string, width: number, height: number): string => {
  if (!url || !url.includes('res.cloudinary.com')) return url;
  return url.replace('/upload/', `/upload/c_fill,w_${width},h_${height},f_auto,q_auto/`);
};

export const getOptimizedVideoUrl = (url: string): string => {
  if (!url) return '';
  if (!url.includes('res.cloudinary.com')) return url;
  
  // Insert f_auto,q_auto transformation for video optimization if not present
  let optimized = url;
  if (!url.includes('/upload/')) return url;
  
  if (!url.includes('/upload/f_auto') && !url.includes('/upload/q_auto')) {
    optimized = url.replace('/upload/', '/upload/f_auto,q_auto/');
  }
  
  // Convert .mov or other formats to .mp4 for iOS Safari compatibility
  // Cloudinary automatically handles transcoding when the extension is changed
  const urlParts = optimized.split('?');
  let basePath = urlParts[0];
  const queryParams = urlParts[1] ? `?${urlParts[1]}` : '';
  
  if (basePath.toLowerCase().endsWith('.mov')) {
    basePath = basePath.slice(0, -4) + '.mp4';
  } else if (basePath.toLowerCase().endsWith('.webm')) {
    basePath = basePath.slice(0, -5) + '.mp4';
  }
  
  return basePath + queryParams;
};

