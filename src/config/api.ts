const envApiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
export const API_BASE_URL = envApiUrl.endsWith("/api") ? envApiUrl : `${envApiUrl}/api`;
export const BUSINESS_ID = "cmlct9h4l0579rb294uz93xmv";

