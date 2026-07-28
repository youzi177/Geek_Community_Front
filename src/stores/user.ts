import { defineStore } from 'pinia'
interface UserInfo {
  name: string
  pic: string
  isVip: string
}
export const useUserStore = defineStore('user', {
  state() {
    return {
      userInfo: null as UserInfo | null,
    }
  },

  getters: {},
  actions: {
    //设置用户基本信息
    setUserInfo(value: UserInfo | null) {
      this.userInfo = value
      if (value) {
        localStorage.setItem('userInfo', JSON.stringify(value)) //localStorage存用户信息
      } else {
        //退出之后value是空，这里删除token
        localStorage.removeItem('userInfo')
      }
    },
  },
})
