import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/pages/home.vue'
import login from '@/pages/login.vue'
import reg from '@/pages/reg.vue'
import forget from '@/pages/forget.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: login,
    },
    {
      path: '/reg',
      name: 'reg',
      component: reg,
    },
    {
      path: '/forget',
      name: 'forget',
      component: forget,
    },
  ],
})

export default router
