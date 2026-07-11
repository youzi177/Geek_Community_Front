import type { LoginInfo } from '@/common/interface'
import axios from 'axios'

//验证码
const getCode = async () => {
  try {
    const response = await axios.get('/public/getCaptcha')
    if (response.status === 200) {
      return response.data
    }
    return response
  } catch (error) {
    console.error(error)
  }
}
//找回密码
const forget = async (option: LoginInfo) => {
  try {
    const response = await axios.post('/login/forget', { ...option })
    if (response.status === 200) {
      return response.data
    }
    return null
  } catch (error) {
    console.error(error)
    return null
  }
}
export { getCode, forget }
