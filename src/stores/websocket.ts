import { defineStore } from 'pinia'
import WebSocketClient from '@/common/websocket'
import { useAuthStore } from './auth'
// WebSocket 连接配置
export interface WebSocketConfig {
  url: string
  port: number | string
  protocol: string
  timeInterval: number
}
export interface payload {
  event?: string
  message: number
}
export const useWebsocketStore = defineStore('websocket', {
  //存数据的地方
  state() {
    return {
      ws: null as WebSocketClient | null,
      num: {} as payload,
    }
  },
  //actions里面放置的是一个一个的方法，用于响应组件中的“动作”
  actions: {
    initWebSocket(config: Partial<WebSocketConfig>) {
      const authStore = useAuthStore()
      this.ws = new WebSocketClient(config, authStore, this)
      this.ws.init()
    },
    // 统一处理 WebSocket 事件
    handleSocketEvent(event: string, payload: { event: string; message: number }) {
      console.log('🚀 ~ payload:', payload)
      switch (event) {
        case 'message':
          // 处理消息
          this.setMessage(payload)
          break
        case 'auth':
          // 处理消息
          // this.setMessage(payload)
          break
        // ... 其他事件
        default:
          console.warn(`未处理的 WebSocket 事件: ${event}`, payload)
      }
    },
    //
    setMessage(payload: { event?: string; message: number }) {
      this.num = payload
    },
  },

  getters: {},
})
