import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  //存数据的地方
  state() {
    return {
      sid: '',
      isLogin: false,
      token: '',
    }
  },
  //actions里面放置的是一个一个的方法，用于响应组件中的“动作”
  actions: {
    // 存放唯一标识
    setSid(value: string) {
      this.sid = value
    },
    //登录状态
    setisLogin(value: boolean) {
      this.isLogin = value
      localStorage.setItem('isLogin', JSON.stringify(value)) //localStorage存用户登录状态
    },
    //存放token
    setToken(value: string) {
      this.token = value
      localStorage.setItem('token', JSON.stringify(value)) //localStorage存用户token
    },
  },

  getters: {},
})
