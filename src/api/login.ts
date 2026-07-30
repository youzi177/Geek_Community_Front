import type { ForgetInfo, LoginInfo, RegInfo } from '@/common/interface'
import axios from '@/common/request'

//验证码
const getCode = async (sid: string) => {
  return await axios.get('/public/getCaptcha', {
    params: {
      sid: sid,
    },
  })
}
//找回密码
const forget = (option: ForgetInfo) => {
  return axios.post('/login/forget', { ...option })
}
//登录
const login = (option: LoginInfo) => {
  return axios.post('/login/login', { ...option })
}
//注册
const reg = (option: RegInfo) => {
  return axios.post('/login/reg', { ...option })
}
export { getCode, forget, login, reg }
