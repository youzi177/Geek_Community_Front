export interface ForgetInfo {
  username: string
  code: string
  sid: string
}

export interface LoginInfo {
  password: string
  username: string
  code: string
  sid: string
}
export interface RegInfo {
  password: string
  username: string
  name: string
  repassword?: string
  code: string
  sid: string
}
export interface getListInfo {
  isTop: number
  page: number
  limit?: number
  catalog?: string
  sort?: string
  status?: string
}

//后端返回的数据格式
export interface HttpResponse {
  code: number
  //unknown：需要类型判断后才能使用
  data?: unknown
  msg?: string
}
