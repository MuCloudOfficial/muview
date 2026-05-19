import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '@/style.css'
import App from '@/App.vue'
import router from '@/router'
import 'element-plus/theme-chalk/dark/css-vars.css'

export const AppInfo = {
  appName: "",
  version: "",
  vercode: 0,
  docLink: undefined,
  repoLink: undefined,
  dev: {
    devName: "",
    email: "" 
  }
}

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

app.mount('#app')
