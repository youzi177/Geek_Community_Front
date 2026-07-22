import type { AxiosError } from 'axios'
import { myalert } from '@/components/modules/alert'
const errorHandle = (error: AxiosError) => {
  myalert(error.message)
  console.log(error)
}
export default errorHandle
