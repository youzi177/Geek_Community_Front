import type { ForgetInfo } from '@/common/interface'
import axios from '@/common/request'

//验证码
const getCode = async () => {
  return await axios.get('/public/getCaptcha')
}
//找回密码
const forget = async (option: ForgetInfo) => {
  return await axios.post('/login/forget', { ...option })
}
export { getCode, forget }
