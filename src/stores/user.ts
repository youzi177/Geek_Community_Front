import { defineStore } from 'pinia'
interface UserInfo {
  name: string
  pic: string
  isVip: string
  count: number
  favs: number
  isSign: boolean
  lastSign: Date | null
  username: string
  location: string
  gender: string
  remark: string
}
export const useUserStore = defineStore('user', {
  state() {
    return {
      userInfo: {} as UserInfo,
    }
  },

  getters: {},
  actions: {
    //设置用户基本信息
    setUserInfo(value: UserInfo) {
      this.userInfo = value
      localStorage.setItem('userInfo', JSON.stringify(value)) //localStorage存用户信息
    },
  },
})
