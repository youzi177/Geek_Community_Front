import type { Collectinfo, CommentBestinfo, Commentinfo } from '@/common/interface'
import axios from '@/common/request'
import { useAuthStore } from '@/stores'
import qs from 'qs'
const AuthStore = useAuthStore()
//获取文章评论数据
const getComments = (param: Commentinfo) => {
  const token = AuthStore.token
  let headers = {}
  if (token !== '') {
    headers = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    }
  }
  return axios.get('/public/comments?' + qs.stringify(param), headers)
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
// 评论点赞setHands
const setHands = (param: { cid: string }) => {
  return axios.get('/comments/hands?' + qs.stringify(param))
}
// 收藏贴子
const addCollect = (param: Collectinfo) => {
  return axios.get('/user/set-collect?' + qs.stringify(param))
}

export { getComments, addComment, updateComment, setCommentBest, setHands, addCollect }
