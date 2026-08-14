const envApiUrl = import.meta.env.VITE_API_URL || "https://saas-platform-backend-1.onrender.com";
export const API_BASE_URL = envApiUrl.endsWith("/api") ? envApiUrl : `${envApiUrl}/api`;
export const BUSINESS_ID = "cmlct9h4l0579rb294uz93xmv";

