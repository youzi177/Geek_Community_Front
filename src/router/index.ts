import { createRouter, createWebHistory } from 'vue-router'

const HomeView = () => import('@/pages/home.vue')
const login = () => import('@/pages/login.vue')
const reg = () => import('@/pages/reg.vue')
const forget = () => import('@/pages/forget.vue')
const Index = () => import('@/pages/channels/Index.vue')
const Template1 = () => import('@/pages/channels/Template1.vue')
// import HomeView from '@/pages/home.vue'
// import login from '@/pages/login.vue'
// import reg from '@/pages/reg.vue'
// import forget from '@/pages/forget.vue'
// import Index from '@/pages/channels/Index.vue'
// import Template1 from '@/pages/channels/Template1.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  //linkActiveClass: 'layui-this',

  routes: [
    {
      path: '/',
      component: HomeView,
      children: [
        {
          path: '/',
          name: 'index',
          component: Index,
        },
        {
          path: '/index/:catalog',
          name: 'catalog',
          component: Template1,
        },
      ],
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
