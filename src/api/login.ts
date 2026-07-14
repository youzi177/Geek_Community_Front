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
const forget = async (option: ForgetInfo) => {
  return await axios.post('/login/forget', { ...option })
}
//登录
const login = async (option: LoginInfo) => {
  return await axios.post('/login/login', { ...option })
}
//注册
const reg = async (option: RegInfo) => {
  return await axios.post('/login/reg', { ...option })
}
export { getCode, forget, login, reg }
