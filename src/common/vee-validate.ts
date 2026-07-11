import { defineRule, configure } from 'vee-validate'
import { required, email, min, length, confirmed, max, is_not } from '@vee-validate/rules'
import { localize } from '@vee-validate/i18n'
import zh from '@vee-validate/i18n/dist/locale/zh_CN.json'

defineRule('required', required)
defineRule('email', email)
defineRule('min', min)
defineRule('length', length)
defineRule('confirmed', confirmed)
defineRule('max', max)
defineRule('is_not', is_not)
//自定义规则
defineRule('name', (value: unknown) => {
  if (!value) {
    return true
  }
  return !/^\d+$/.test(String(value)) || '不能以纯数字为昵称'
})
//i18n
const config = {
  messages: {
    ...zh.messages,
    required: '请输入{field}',
    min: '请在{field}输入至少有0:{length}个字符',
  },
  names: {
    email: '邮箱',
    username: '用户名',
    code: '验证码',
    vcode: '邮箱验证码',
    name: '昵称',
    password: '密码',
    repassword: '密码',
    // usernamecode: '邮箱验证码',
    oldpassword: '旧密码',
    title: '标题',
    catalog: '分类',
  },
  fields: {
    catalog: {
      is_not: '请选择{field}',
    },
    repassword: {
      confirmed: '两次输入的{field}不一致！',
    },
    code: {
      length: () => '请输入4位验证码',
    },
  },
}
configure({
  // Generates an English message locale generator
  generateMessage: localize('zh_CN', config),
})
