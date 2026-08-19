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
  regmark: string
  _id: string
  status: string
}
export const useUserStore = defineStore('user', {
  state() {
    return {
      userInfo: {} as UserInfo,
    }
  },

  getters: {},
  actions: {
    //设置用户基本信息，Partial<UserInfo>表示修改部分数据
    setUserInfo(value: Partial<UserInfo>) {
      this.userInfo = {
        ...this.userInfo,
        ...value,
      }
      localStorage.setItem('userInfo', JSON.stringify(this.userInfo)) //localStorage存用户信息
    },
    // 清除用户信息（重置为空对象）
    clearUserInfo() {
      this.userInfo = {} as UserInfo
      localStorage.removeItem('userInfo')
    },
  },
})
