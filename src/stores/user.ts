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
    setUserInfo(value: UserInfo) {
      this.userInfo = value
    },
  },
})
