export interface ForgetInfo {
  username: string
  code: string
  sid: string
}

export interface LoginInfo {
  password: string
  username: string
  code: string
  sid: string
}
export interface RegInfo {
  password: string
  username: string
  name: string
  repassword?: string
  code: string
  sid: string
}
export interface getListInfo {
  isTop: number
  page: number
  limit?: number
  catalog?: string
  sort?: string
  status?: string
}
export interface UserInfo {
  _id?: string
  username?: string
  name?: string
  location?: string
  gender?: string
  regmark?: string
  pic?: string
  isSign?: boolean
  lastSign?: string
  count?: number
  favs?: number
  isVip?: string
}
export interface ResetInfo {
  key: string | null
  password: string
  code: string
  sid: string
}
export interface PostData {
  title: string
  catalog?: string
  content: string
  fav?: number
  code: string
  sid: string
  tid?: string
}

//后端返回的数据格式
//msg返回的时候大部分是string，但是注册的时候返回的对象，所以这里使用泛型，默认string
export interface HttpResponse {
  code: number
  //data不知道返回的什么数据
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any
  token?: string
  msg?: string
  favs?: number
  count?: number
  lastSign?: Date
  total: number
}
//文章列表定义数据类型
interface Tag {
  name: string
  class: string
}
interface UserInfoArt {
  name: string
  pic: string
  isVip: string
  _id: string
}
export interface Article {
  title: string
  content: string
  created: string
  catalog: string
  fav: string
  isEnd: string
  reads: number
  answer: number
  status: string
  isTop: string
  sort: string
  tags: Tag[]
  _id: string
  uid: UserInfoArt
  isFav: boolean //收藏
  tid: string
}

//评论数据
export interface Comments {
  cuid: UserInfoArt
  uid: UserInfoArt
  content: string
  isBest: string
  isRead: string
  hands: string
  created: string
  status: string
  handed: string //是否点赞0：未点赞，1：已经点赞
  _id: string
  tid: Article
}
//添加评论数据
export interface Commentinfo {
  content?: string
  code?: string
  sid?: string
  tid: string
  page?: number
  limit?: number
  cid?: string
}
//采纳
export interface CommentBestinfo {
  cid: string
  tid: string
}
// 收藏
export interface Collectinfo {
  tid?: string
  title?: string
  isFav?: boolean
  page?: number
  limit?: number
}
// 我的消息
export interface Msginfo {
  cuid: UserInfoArt
  title: string
  comntent: string
  created: string
  tid: Article
  _id: string
  content: string
}
