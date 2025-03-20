import { createApp } from 'vue'
import App from './App.vue'
import 'normalize.css'
import '@/assets/css/index.less'
import router from './router'
import store from './stores'
import icons from './global/register-icons'

const app = createApp(App)
app.use(icons)

app.use(store)
app.use(router) // 注册路由,放在store后面
app.mount('#app')
