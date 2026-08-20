import type { Article } from '@/common/interface'
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    isHide: false,
    currentPage: {} as Article,
  }),

  actions: {
    // 设置container的状态
    setHide(value: boolean) {
      this.isHide = value
    },
    setPage(page: Article) {
      this.currentPage = page
    },
  },
})
