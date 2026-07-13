import type { ForgetInfo } from '@/common/interface'
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
export { getCode, forget }
