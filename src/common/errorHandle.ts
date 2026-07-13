import type { AxiosError } from 'axios'

const errorHandle = (error: AxiosError) => {
  console.log(error)
}
export default errorHandle
