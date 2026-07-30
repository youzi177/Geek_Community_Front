import axios from '@/common/request'
import { useAuthStore } from '@/stores'

const headers = {
  Authorization: 'Bearer ' + useAuthStore().token,
  'Content-Type': 'application/json',
}
//用户签到
const userSign = () => {
  return axios.get('/user/fav', {
    headers: headers,
  })
}
export { userSign }
