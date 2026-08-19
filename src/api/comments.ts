import type { CommentBestinfo, Commentinfo } from '@/common/interface'
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
//更新评论
const updateComment = (data: Commentinfo) => {
  return axios.post('/comments/update', { ...data })
}
//采纳最佳答案
const setCommentBest = (param: CommentBestinfo) => {
  return axios.get('/comments/accept?' + qs.stringify(param))
}
export { getComments, addComment, updateComment, setCommentBest }
