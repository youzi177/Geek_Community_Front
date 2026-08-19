import type { Commentinfo } from '@/common/interface'
import axios from '@/common/request'
import qs from 'qs'

//获取文章评论数据
const getComments = (param: Commentinfo) => {
  return axios.get('/public/comments?' + qs.stringify(param))
}
//添加评论
const addComment = (data: Commentinfo) => {
  return axios.post('/comments/reply', { ...data })
}
export { getComments, addComment }
