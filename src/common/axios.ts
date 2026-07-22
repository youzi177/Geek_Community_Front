import axios, {
  AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type Canceler,
} from 'axios'
import errorHandle from './errorHandle'
import type { HttpResponse } from './interface'
const CancelToken = axios.CancelToken //取消重复请求

class HttpRequest {
  private baseUrl: string
  // 格式 pending = {
  //   '/user/list&get': cancel函数,
  //   '/goods/list&get': cancel函数,
  // }
  private pending: Record<string, Canceler> //保存正在请求中的请求
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
    this.pending = {}
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
  removePending(key: string, isRequest = false) {
    //true说明对应的url已经发起请求，取消上一次请求，执行cancel方法
    if (this.pending[key] && isRequest) {
      //调用之前保存的那个请求取消函数，把已经存在的同名请求取消掉。并传入取消原因
      this.pending[key]('请不要重复点击')
    }
    //删除旧记录
    delete this.pending[key]
  }
  //设置拦截器
  interceptors(instance: AxiosInstance) {
    // 添加请求拦截器
    instance.interceptors.request.use(
      (config) => {
        // 在请求发送之前执行某些操作
        // console.log('config', config)
        const key =
          config.url +
          '&' +
          config.method
        //检查有没有相同的请求正在发送，如果有，就调用它的取消函数取消旧请求，然后删除旧记录。
        this.removePending(key, true)
        //给当前请求绑定一个取消函数 c，并把它保存起来，方便以后通过 this.pending[key]() 取消这个请求。
        config.cancelToken = new CancelToken((c) => {
          //c:取消函数的回调
          this.pending[key] = c
        })
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
        const key = res.config.url + '&' + res.config.method
        //删除旧记录，释放 pending 对象里保存的取消函数，避免请求完成后无用的引用一直占用内存。
        this.removePending(key)
        // 状态码在 2xx 范围内的响应会触发此函数
        // 处理响应数据
        //console.log('res', res)
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
