import { useAuthStore, useUserStore } from '@/stores'
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
const MyInfo = () => import('@/components/user/common/MyInfo.vue')
const PicUpload = () => import('@/components/user/common/PicUpload.vue')
const Password = () => import('@/components/user/common/Password.vue')
const Accounts = () => import('@/components/user/common/Accounts.vue')
const MyPost = () => import('@/components/user/common/MyPost.vue')
const MyCollection = () => import('@/components/user/common/MyCollection.vue')
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
    // 首页
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
      meta: { requiresAuth: true }, //路由元信息
      //center路由守卫
      // beforeEnter: () => {
      //   const auth = useAuthStore()
      //   // 未登录
      //   if (!auth.isLogin) {
      //     //看本地有没有token和userInfoStr
      //     const token = localStorage.getItem('token')
      //     const userInfoStr = localStorage.getItem('userInfo')
      //     const userInfo = userInfoStr ? JSON.parse(userInfoStr) : null
      //     if (token !== '' && token !== null) {
      //       useAuthStore().setToken(token)
      //       useUserStore().setUserInfo(userInfo)
      //       useAuthStore().setisLogin(true)
      //       return true
      //     }
      //     return {
      //       name: 'login',
      //     }
      //   }
      //   //登录
      //   return true
      // },
      children: [
        {
          path: '',
          name: 'center',

          component: UserCenter,
        },
        // 基本设置
        {
          path: 'set',
          name: 'set',
          component: UserSet,
          // redirect: {
          //   name: 'info',
          // },
          children: [
            {
              path: 'info',
              name: 'info',
              component: MyInfo,
            },
            //子路由不要以 / 开头，否则它会被当成根路径路由，不会拼接父级路径。
            {
              path: 'pic',
              name: 'pic',
              component: PicUpload,
            },
            {
              path: 'password',
              name: 'password',
              component: Password,
            },
            {
              path: 'accounts',
              name: 'accounts',
              component: Accounts,
            },
          ],
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
        // 我的贴子
        {
          path: 'posts',
          name: 'posts',
          component: UserPosts,
          children: [
            {
              path: 'mypost',
              name: 'mypost',
              component: MyPost,
            },
            {
              path: 'mycollection',
              name: 'mycollection',
              component: MyCollection,
            },
          ],
        },
      ],
    },
  ],
})
//全局路由守卫 vuerouter5不推荐使用next
router.beforeEach((to) => {
  //第一种解决方式：
  // if (to.name === 'login') {
  //   return true
  // }
  //看本地有没有token和userInfoStr
  const token = localStorage.getItem('token')
  const userInfoStr = localStorage.getItem('userInfo')
  const userInfo = userInfoStr ? JSON.parse(userInfoStr) : null
  if (token !== '' && token !== null) {
    useAuthStore().setToken(token)
    useUserStore().setUserInfo(userInfo)
    useAuthStore().setisLogin(true)
    return true
  }
  //第二种：
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    //需要登录的页面
    const auth = useAuthStore()
    // 未登录
    if (!auth.isLogin) {
      return {
        name: 'login',
      }
    }
    //登录
    //登录后可以权限判断，对用户的身份判断，如管理员可以删贴等
    return true
  } else {
    return true
  }
})

export default router
