import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    isHide: false,
  }),

  actions: {
    // 设置container的状态
    setHide(value: boolean) {
      this.isHide = value
    },
  },
})
