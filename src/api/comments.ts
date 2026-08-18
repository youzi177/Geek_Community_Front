import type { Commentinfo } from '@/common/interface'
import axios from '@/common/request'

//获取文章评论数据
const getComments = (tid: string) => {
  return axios.get('/public/comments?tid=' + tid)
}
//添加评论
const addComment = (data: Commentinfo) => {
  return axios.post('/comments/reply', { ...data })
}
export { getComments, addComment }
