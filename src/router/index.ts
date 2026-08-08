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
const NoFound = () => import('@/pages/NoFound.vue')
const Confirm = () => import('@/pages/Confirm.vue')
const Reset = () => import('@/pages/Reset.vue')
const Add = () => import('@/components/contents/Add.vue')
import { jwtDecode } from 'jwt-decode'
import moment from 'dayjs'
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
      // 综合首页
      children: [
        {
          path: '',
          name: 'index',
          component: Index,
        },
        //其他分类下的首页
        {
          path: '/index/:catalog',
          name: 'catalog',
          component: Template1,
        },
      ],
    },
    // 登录
    {
      path: '/login',
      name: 'login',
      component: login,
    },
    // 注册
    {
      path: '/reg',
      name: 'reg',
      component: reg,
    },
    // 找回密码
    {
      path: '/forget',
      name: 'forget',
      component: forget,
    },
    {
      path: '/confirm',
      name: 'confirm',
      component: Confirm,
    },
    {
      path: '/reset',
      name: 'reset',
      component: Reset,
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
      meta: { requiresAuth: true }, //路由元信息，需要登录才能进去的路由
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
        // 用户中心
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
            // 我的资料
            {
              path: 'info',
              name: 'info',
              component: MyInfo,
            },
            //修改头像子路由不要以 / 开头，否则它会被当成根路径路由，不会拼接父级路径。
            {
              path: 'pic',
              name: 'pic',
              component: PicUpload,
            },
            // 修改密码
            {
              path: 'password',
              name: 'password',
              component: Password,
            },
            // 账号绑定
            {
              path: 'accounts',
              name: 'accounts',
              component: Accounts,
            },
          ],
        },
        // 我的贴子
        {
          path: 'posts',
          name: 'posts',
          component: UserPosts,
          children: [
            // 发表的贴子
            {
              path: 'mypost',
              name: 'mypost',
              component: MyPost,
            },
            // 收藏贴子
            {
              path: 'mycollection',
              name: 'mycollection',
              component: MyCollection,
            },
          ],
        },
        // 我的消息
        {
          path: 'msg',
          name: 'msg',
          component: UserMsg,
        },
        // 其他设置
        {
          path: 'others',
          name: 'others',
          component: UserOthers,
        },
      ],
    },
    // 发帖
    {
      path: '/add',
      name: 'add',
      component: Add,
    },
    // 404页面
    {
      path: '/404',
      component: NoFound,
    },
    // 匹配所有不存在的路由
    {
      path: '/:pathMatch(.*)*',
      redirect: '/404',
    },
  ],
})
//全局路由守卫 vuerouter5不推荐使用next
router.beforeEach((to) => {
  //pinia
  const AuthStore = useAuthStore()
  const UserStore = useUserStore()
  //第一种解决方式：
  // if (to.name === 'login') {
  //   return true
  // }
  //看本地有没有token和userInfoStr
  const token = localStorage.getItem('token')
  const userInfoStr = localStorage.getItem('userInfo')
  const userInfo = userInfoStr ? JSON.parse(userInfoStr) : null
  if (token !== '' && token !== null) {
    const payload = jwtDecode<{ exp: number }>(token)
    //如果没过期
    if (moment().isBefore(moment(payload.exp * 1000))) {
      AuthStore.setToken(token)
      UserStore.setUserInfo(userInfo)
      AuthStore.setisLogin(true)
      return true
    } else {
      localStorage.clear()
    }
  }
  //第二种：
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    //需要登录的页面
    // 未登录
    if (!AuthStore.isLogin) {
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
