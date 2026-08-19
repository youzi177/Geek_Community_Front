import { createApp, type Directive } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import '@/common/vee-validate.ts'
import directives from '@/utils/directive.ts'
const app = createApp(App)

Object.keys(directives).forEach((key: string) => {
  app.directive(key, directives[key] as Directive)
})
app.use(createPinia())
app.use(router)

app.mount('#app')
