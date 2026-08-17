import axios from '@/common/request'

//获取文章评论数据
const getComments = (tid: string) => {
  return axios.get('/public/comments?tid=' + tid)
}

export { getComments }
