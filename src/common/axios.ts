import axios, {
  AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
} from 'axios'
import errorHandle from './errorHandle'
import type { HttpResponse } from './interface'

class HttpRequest {
  private baseUrl: string
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }
  // 获取配置
  getConfig() {
    const config = {
      baseURL: this.baseUrl,
      headers: {
        'content-Type': 'application/json;charset=utf-8',
      },
      timeout: 10000, // 10秒断定失败
    }
    return config
  }
  //设置拦截器
  interceptors(instance: AxiosInstance) {
    // 添加请求拦截器
    instance.interceptors.request.use(
      (config) => {
        // 在请求发送之前执行某些操作
        console.log('config', config)
        return config
      },
      (error: AxiosError) => {
        // 处理请求错误
        errorHandle(error)
        return Promise.reject(error)
      },
    )
    // 添加响应拦截器
    instance.interceptors.response.use(
      (res) => {
        // 状态码在 2xx 范围内的响应会触发此函数
        // 处理响应数据
        console.log('res', res)
        if (res.status === 200) {
          return Promise.resolve(res.data)
        } else {
          return Promise.reject(res)
        }
      },
      (error: AxiosError) => {
        // 状态码不在 2xx 范围内的响应会触发此函数
        // 处理响应错误
        errorHandle(error)
        return Promise.reject(error)
      },
    )
  }
  //创建实例
  request(options: AxiosRequestConfig) {
    const instance = axios.create()
    const newOPtions = Object.assign(this.getConfig(), options)
    this.interceptors(instance)
    return instance(newOPtions)
  }
  //封装get,config不一定存在
  get(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse> | Promise<HttpResponse> {
    const options = Object.assign(
      {
        method: 'get',
        url: url,
      },
      config,
    )
    return this.request(options)
  }
  //封装post
  //Promise<AxiosResponse> 是这个方法的返回值类型声明，告诉 TypeScript：这个 post 方法返回的是一个 Promise，Promise 成功后拿到的值是 Axios 的响应对象 AxiosResponse。
  // data?: AxiosRequestConfig['data']Axios 已经提供了 AxiosRequestConfig['data'] 类型any | string | object | ArrayBuffer | FormData | Blob | ...
  post(
    url: string,
    data?: AxiosRequestConfig['data'],
  ): Promise<AxiosResponse> | Promise<HttpResponse> {
    return this.request({
      method: 'post',
      url: url,
      data: data,
    })
  }
}
export default HttpRequest
