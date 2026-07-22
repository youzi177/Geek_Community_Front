import type { getListInfo } from '@/common/interface'
import axios from '@/common/request'
import qs from 'qs'
/**
 * 读取文章列表
 * @param options 读取文章列表参数
 * @returns
 */
const getList = (options: getListInfo) => {
  return axios.get('/public/list?' + qs.stringify(options))
}
/**
 * 本周热议
 * @returns
 */
const getTop = () => {
  return axios.get('/public/topWeek ')
}

/**
 *温馨提醒接口
 * @returns
 */
const getTips = () => {
  return axios.get('/public/tips ')
}
/**
 *友情链接
 * @returns
 */
const getLinks = () => {
  return axios.get('/public/tips ')
}

export { getList, getTips, getLinks, getTop }
