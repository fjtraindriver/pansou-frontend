// Vercel 部署用：后端地址来自构建时环境变量 VITE_API_BASE_URL
// 填法：在 Vercel 项目设置里填后端根地址，例如 https://your-backend-host:8888
// 注意：不要带末尾斜杠，也不要带 /api 后缀；留空则退回相对路径 /api（同域部署用）
export const API_BASE = ((import.meta.env.VITE_API_BASE_URL as string | undefined) || '').trim().replace(/\/+$/, '');
export const apiUrl = (path: string) => (API_BASE ? `${API_BASE}${path}` : path);
