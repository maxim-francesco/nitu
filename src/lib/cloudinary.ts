export const getOptimizedImageUrl = (url: string, width: number, height: number): string => {
  if (!url || !url.includes('res.cloudinary.com')) return url;
  return url.replace('/upload/', `/upload/c_fill,w_${width},h_${height},f_auto,q_auto/`);
};

export const getOptimizedVideoUrl = (url: string): string => {
  if (!url) return '';
  if (!url.includes('res.cloudinary.com')) return url;
  
  // Replace /upload/ with /upload/vc_h264,q_auto/ to force standard H.264 MP4 transcoding.
  // Avoid f_auto on videos because iOS Safari's native AVPlayer fails to play videos 
  // with content-negotiation / user-agent redirection headers.
  let optimized = url;
  if (!url.includes('/upload/')) return url;
  
  if (!url.includes('/upload/vc_h264')) {
    optimized = url
      .replace('/upload/f_auto,q_auto/', '/upload/vc_h264,q_auto/')
      .replace('/upload/f_auto/', '/upload/vc_h264/')
      .replace('/upload/', '/upload/vc_h264,q_auto/');
  }
  
  // Convert any format (.mov, .webm, etc.) to .mp4 for iOS Safari compatibility
  // Cloudinary automatically handles transcoding when the extension is changed
  const urlParts = optimized.split('?');
  let basePath = urlParts[0];
  const queryParams = urlParts[1] ? `?${urlParts[1]}` : '';
  
  const lastDotIndex = basePath.lastIndexOf('.');
  if (lastDotIndex !== -1 && basePath.substring(lastDotIndex).toLowerCase() !== '.mp4') {
    basePath = basePath.substring(0, lastDotIndex) + '.mp4';
  }
  
  return basePath + queryParams;
};

