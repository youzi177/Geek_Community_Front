// import { useAuthStore } from '@/stores'
// import { useWebsocketStore } from '@/stores'
// const AuthStore = useAuthStore()
// const WebsocketStore = useWebsocketStore()
import type { useWebsocketStore } from '@/stores/websocket' // 类型导入
import type { useAuthStore } from '@/stores/auth' // 类型导入

type AuthStore = ReturnType<typeof useAuthStore>
type WebsocketStore = ReturnType<typeof useWebsocketStore>

// WebSocket 连接配置
export interface WebSocketConfig {
  url: string
  port: number | string
  protocol: string
  timeInterval: number
}

// 服务端消息结构
// export interface SocketMessage {
//   event: string
//   message: string
//   [key: string]: string
// }

class WebSocketClient {
  private ws: WebSocket | null = null
  private port: number | string
  private url: string
  private protocol: string
  private authStore: AuthStore // 保存 auth store 实例
  private websocketStore: WebsocketStore // 保存 websocket store 实例
  private handle: ReturnType<typeof setTimeout> | undefined
  private timeInterval: number
  constructor(
    config: Partial<WebSocketConfig> = {},
    authStore: AuthStore,
    websocketStore: WebsocketStore,
  ) {
    const defaultConfig = {
      url: '127.0.0.1',
      port: 3001,
      protocol: 'ws',
      timeInterval: 3 * 1000,
    }
    // 最终配置
    const finalConfig = { ...defaultConfig, ...config }
    this.port = finalConfig.port
    this.url = finalConfig.url
    this.protocol = finalConfig.protocol
    this.authStore = authStore
    this.websocketStore = websocketStore
    this.timeInterval = finalConfig.timeInterval
  }

  // 初始化
  init() {
    this.ws = new WebSocket(`${this.protocol}://${this.url}:${this.port}`)
    this.ws.onopen = () => this.onOpen()
    this.ws.onmessage = (msg) => this.onMessage(msg)
    this.ws.onclose = () => this.onClose()
    this.ws.onerror = () => this.onError()
  }
  // 发送消息
  send(msg: string) {
    this.ws?.send(msg)
  }
  // 主动发送消息到服务端
  onOpen() {
    // 一定要先鉴权
    this.send(
      JSON.stringify({
        event: 'auth',
        message: 'Bearer ' + this.authStore.token,
      }),
    )
    this.cheackServer()
  }
  //接收服务端消息
  onMessage(event: MessageEvent) {
    // console.log(event)
    const obj = JSON.parse(event.data)
    switch (obj.event) {
      case 'noauth':
        break
      case 'heartbeat':
        this.cheackServer() //客户端如果挂了，会一直重连
        this.ws?.send(
          JSON.stringify({
            event: 'heartbeat',
            message: 'pong',
          }),
        )
        break
      default:
        // 等会写
        // WebsocketStore.handleSocketEvent(obj.event, obj)
        this.websocketStore.handleSocketEvent(obj.event, obj) // 使用传入的 store
    }
  }
  //当连接关闭的时候触发
  onClose() {
    console.log('close ', this.ws?.readyState)
    console.log('已关闭WebSocket')
    this.ws?.close()
  }
  // 当连接失败的时候触发
  onError() {
    console.log('error ', this.ws?.readyState)
    console.log('WebSocket连接失败')
    // 连接失败后进行断线重连
    setTimeout(() => {
      this.init()
    }, 1000)
  }
  //断线重连
  cheackServer() {
    clearTimeout(this.handle)
    this.handle = setTimeout(() => {
      this.onClose()
      this.onError()
    }, this.timeInterval + 500) //这里1000是心跳检测时间，500是网络延时
  }
}
export default WebSocketClient
