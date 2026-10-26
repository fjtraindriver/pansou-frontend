# PanSou 前端 · Vercel 部署说明（已打补丁版）

本目录是 fish2018/pansou-web 的改动版，唯一改动是让生产构建真正读环境变量。

## 改了什么
- 新增 `src/utils/apiBase.ts`：读 `VITE_API_BASE_URL`，去尾斜杠
- `src/api/*.ts` 的 baseURL 从相对路径改为 `apiUrl('/api' | '/qqpd' | ...)`
- `src/main.ts`：全局 axios 默认 baseURL 也设为同一后端，存活面板和接口文档的直接调用同样走后端
- 上游原版生产构建只用相对路径 `/api`，`VITE_API_BASE_URL` 只在 `vite.config.js` 的开发代理里用，改之前在 Vercel 上只填环境变量是无效的

## 在 Vercel 上配置
1. 新建项目，导入本目录（或 fork 后导入）
2. Framework 选 Vite，Build Command `npm run build`，Output Directory `dist`
3. 环境变量（Production 也要勾）：
   - 名称：`VITE_API_BASE_URL`
   - 值：后端根地址，例如 `https://your-backend-host:8888`，不要带末尾斜杠，不要带 `/api`
4. 部署后如改了这个值，必须点 Redeploy 重新构建才生效——Vite 会在构建时把环境变量写进 JS，改变量本身不触发重建

## 前置条件
- 后端必须是 https，否则 Vercel 的 https 页面调 http 后端会被浏览器按混合内容拦截
- 后端已确认 CORS 为 `*`，允许 Authorization 头，跨域直接调没问题
- 后端开启认证时，前端登录走同一后端 `/api/auth/login`，token 存 localStorage，和原版一致
