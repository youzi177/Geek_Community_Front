import axios from '@/common/request'
import qs from 'qs'
// 获取签到排行
const getHotSignRecord = (data: { page: number; limit: number; index: number }) =>
  axios.get('/public/hotSignRecord?' + qs.stringify(data))

export { getHotSignRecord }
