import axios from '@/common/request'
import { useAuthStore } from '@/stores'

//用户签到
const userSign = () => {
  const headers = {
    Authorization: 'Bearer ' + useAuthStore().token,
    'Content-Type': 'application/json',
  }
  return axios.get('/user/fav', {
    headers: headers,
  })
}
export { userSign }
