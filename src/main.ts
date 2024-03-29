
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import zhCn  from 'element-plus/dist/locale/zh-cn.mjs';
import '@/styles/index.scss'
import {useElIcon} from '@/utils/setGlobal'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus, { locale: zhCn })
useElIcon(app)

app.mount('#app')
