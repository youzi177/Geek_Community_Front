export interface ForgetInfo {
  username: string
  code: string
}
//后端返回的数据格式
export interface HttpResponse {
  code: number
  //unknown：需要类型判断后才能使用
  data?: unknown
  msg?: string
}
