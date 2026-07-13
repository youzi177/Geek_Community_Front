import HttpRequest from './axios'
import config from '../config/index'
// 定义baseUrl
const baseUrl = import.meta.env.MODE === 'development' ? config.basurl.dev : config.basurl.prop
// 实例化HttpRequest
const axios = new HttpRequest(baseUrl)
export default axios
