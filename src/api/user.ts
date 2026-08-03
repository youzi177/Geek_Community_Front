import type { UserInfo } from '@/common/interface'
import axios from '@/common/request'

//用户签到
const userSign = () => {
  return axios.get('/user/fav')
}
//更新用户基本资料
const updateUserInfo = (data: UserInfo) => {
  return axios.post('/user/basic', data)
}
export { userSign, updateUserInfo }
