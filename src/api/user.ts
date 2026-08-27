import type { Collectinfo, UserInfo } from '@/common/interface'
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
// 获取发表过的文章
const getPostListByUid = (param: { page: number; limit: number }) => {
  return axios.get('/user/post?' + qs.stringify(param))
}
// 删除贴子
const deletPostByUid = (param: { tid: string }) => {
  return axios.get('/user/delet-post?' + qs.stringify(param))
}
//获取收藏列表
const getCollect = (param: Collectinfo) => {
  return axios.get('/user/collect?' + qs.stringify(param))
}
// 获取用户基本信息
const getInfo = (param: { uid: string }) => {
  return axios.get('/public/info?' + qs.stringify(param))
}
// 获取用户最近的发表文章列表
const getPostPublic = (data: { uid: string; page: number; limit: number }) =>
  axios.get('/public/latestPost?' + qs.stringify(data))
// 获取用户最近评论列表
const getCommentPublic = (data: { uid: string; page: number; limit: number }) =>
  axios.get('/public/latestComment?' + qs.stringify(data))

// 获取用户未读消息
const getMsg = (param: { page: number; limit: number }) => {
  return axios.get('/user/msg?' + qs.stringify(param))
}
export {
  userSign,
  updateUserInfo,
  updateUsername,
  changePassword,
  getPostListByUid,
  deletPostByUid,
  getCollect,
  getInfo,
  getPostPublic,
  getCommentPublic,
  getMsg,
}
