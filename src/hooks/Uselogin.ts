import { useAuthStore } from '@/stores'
import { reactive } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import { getCode } from '@/api/login'
import type { HttpResponse } from '@/common/interface'
export default () => {
  //pinia
  const AuthStore = useAuthStore()
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
    //sidValue保存起来，然后判断是不是空的
    const sidValue = localStorage.getItem('sid')
    if (sidValue !== null) {
      //不是空的存到变量sid
      sid = sidValue
    } else {
      //没有sid就生成一个存到变量sid
      // 并存入localStorage
      sid = uuidv4()
      localStorage.setItem('sid', sid)
    }
    //存到pinia
    AuthStore.setSid(sid)
  }
  //发送验证码
  const _getCode = async () => {
    const sid = AuthStore.sid
    //请求验证码
    const result = (await getCode(sid)) as HttpResponse
    //解构
    const { code, data } = result as HttpResponse
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
