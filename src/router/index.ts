import { createRouter, createWebHistory } from 'vue-router'

const HomeView = () => import('@/pages/home.vue')
const login = () => import('@/pages/login.vue')
const reg = () => import('@/pages/reg.vue')
const forget = () => import('@/pages/forget.vue')
const Index = () => import('@/pages/channels/Index.vue')
const Template1 = () => import('@/pages/channels/Template1.vue')
const Center = () => import('@/pages/Center.vue')
const UserCenter = () => import('@/components/user/Center.vue')
const UserMsg = () => import('@/components/user/Msg.vue')
const UserOthers = () => import('@/components/user/Others.vue')
const UserPosts = () => import('@/components/user/Posts.vue')
const UserSet = () => import('@/components/user/Settings.vue')
const User = () => import('@/pages/User.vue')
// import HomeView from '@/pages/home.vue'
// import login from '@/pages/login.vue'
// import reg from '@/pages/reg.vue'
// import forget from '@/pages/forget.vue'
// import Index from '@/pages/channels/Index.vue'
// import Template1 from '@/pages/channels/Template1.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  //linkActiveClass: 'layui-this',
  linkExactActiveClass: 'layui-this', // 选中颜色
  routes: [
    {
      path: '/',
      component: HomeView,
      children: [
        {
          path: '',
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
    // 个人主页
    {
      path: '/user',
      name: 'user',
      component: User,
    },
    //个人中心
    {
      path: '/center',
      //name: 'center',
      component: Center,

      children: [
        {
          path: '',
          name: 'center',
          component: UserCenter,
        },
        {
          path: 'set',
          name: 'set',
          component: UserSet,
        },
        {
          path: 'msg',
          name: 'msg',
          component: UserMsg,
        },
        {
          path: 'others',
          name: 'others',
          component: UserOthers,
        },
        {
          path: 'posts',
          name: 'posts',
          component: UserPosts,
        },
      ],
    },
  ],
})

export default router
