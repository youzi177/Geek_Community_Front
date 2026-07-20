import type { AxiosError } from 'axios'
import { myalert } from '@/components/modules/alert'
const errorHandle = (error: AxiosError) => {
  myalert('服务器错误，请联系网站管理员' + error.message)
  console.log(error)
}
export default errorHandle
