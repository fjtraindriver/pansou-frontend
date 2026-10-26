import { createApp } from 'vue'
import axios from 'axios'
import { API_BASE } from './utils/apiBase'

// 直接用全局 axios 调 /api 的组件（存活面板、接口文档试调）也走同一后端
if (API_BASE) {
  axios.defaults.baseURL = API_BASE
}
import App from './App.vue'

import './assets/styles/pansou.css'

// 创建应用实例
const app = createApp(App)

// 挂载应用
app.mount('#app')
