import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import '@/common/vee-validate.ts'
import axios from 'axios'
const app = createApp(App)
axios.defaults.baseURL =
  import.meta.env.MODE === 'development' ? 'http://localhost:3000' : 'https://you.domain.com'
app.use(createPinia())
app.use(router)

app.mount('#app')
