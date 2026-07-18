import { useAuthStore } from '@/stores'
import { reactive } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import { getCode } from '@/api/login'
import type { HttpResponse } from '@/common/interface'
export default () => {
  //数据
  const state = reactive({
    username: '',
    name: '',
    password: '',
    repassword: '',
    code: '',
    svg: '',
  })
  //设置sid
  const setid = () => {
    let sid = ''
    //从localStorage取值sid
    if (localStorage.getItem('sid')) {
      sid = localStorage.getItem('sid') || ''
      //存到pinia
    } else {
      //没有sid就生成一个并存入localStorage
      sid = uuidv4()
      localStorage.setItem('sid', sid)
      //存到pinia
    }
    useAuthStore().setSid(sid)
  }
  //发送验证码
  const _getCode = async () => {
    const sid = useAuthStore().sid
    //请求验证码
    const result = (await getCode(sid)) as HttpResponse
    //解构
    const { code, data } = result
    if (code === 200) {
      state.svg = data as string
    }
  }
  return {
    state,
    setid,
    _getCode,
  }
}
