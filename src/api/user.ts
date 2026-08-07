import type { UserInfo } from '@/common/interface'
import axios from '@/common/request'
import qs from 'qs'

//用户签到
const userSign = () => {
  return axios.get('/user/fav')
}
//更新用户基本资料
const updateUserInfo = (data: UserInfo) => {
  return axios.post('/user/basic', data)
}
//确认修改用户名
const updateUsername = (data: { username: string }) => {
  return axios.get('/public/reset-email?' + qs.stringify(data))
}
//修改密码
const changePassword = (data: { oldpwd: string; newpwd: string }) => {
  return axios.post('user/changePassword', data)
}

export { userSign, updateUserInfo, updateUsername, changePassword }
