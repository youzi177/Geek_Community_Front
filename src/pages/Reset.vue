<template>
  <div class="layui-container fly-marginTop">
    <div class="fly-panel fly-panel-user" pad20>
      <div class="layui-tab layui-tab-brief" lay-filter="user">
        <ul class="layui-tab-title">
          <li><RouterLink :to="{ name: 'login' }">登录</RouterLink></li>
          <li class="layui-this">重置密码</li>
        </ul>
        <div class="layui-form layui-tab-content" id="LAY_ucm" style="padding: 20px 0">
          <div class="layui-tab-item layui-show">
            <div class="layui-form layui-form-pane">
              <Form @submit="submit" v-slot="{ errors }">
                <div class="layui-form-item">
                  <label for="L_email" class="layui-form-label">新密码</label>
                  <div class="layui-input-inline">
                    <Field
                      type="password"
                      as="input"
                      name="password"
                      rules="required|min:6|max:16"
                      placeholder="请输入密码"
                      autocomplete="off"
                      class="layui-input"
                      v-model="password"
                    />
                  </div>
                  <!-- 错误信息展示 -->
                  <div class="layui-form-mid">
                    <span style="color: #c00">{{ errors.password }}</span>
                  </div>
                </div>
                <div class="layui-form-item">
                  <label for="L_repass" class="layui-form-label">确认密码</label>
                  <div class="layui-input-inline">
                    <Field
                      type="password"
                      as="input"
                      name="repassword"
                      rules="required|confirmed:@password"
                      placeholder="请确认密码"
                      autocomplete="off"
                      class="layui-input"
                      v-model="repassword"
                    />
                  </div>
                  <!-- 错误信息展示 -->
                  <div class="layui-form-mid">
                    <span style="color: #c00">{{ errors.repassword }}</span>
                  </div>
                </div>
                <div class="layui-form-item">
                  <label for="L_vercode" class="layui-form-label">验证码</label>
                  <div class="layui-input-inline">
                    <Field
                      type="text"
                      as="input"
                      name="code"
                      placeholder="请输入验证码"
                      rules="required|length:4"
                      autocomplete="off"
                      class="layui-input"
                      v-model="code"
                    />
                  </div>
                  <div>
                    <span class="svg" style="color: #c00" @click="_getCode" v-html="svg"></span>
                  </div>
                  <div class="layui-form-mid">
                    <span style="color: #c00">{{ errors.code }}</span>
                  </div>
                </div>
                <div class="layui-form-item">
                  <button class="layui-btn" lay-submit type="submit">提交</button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reset } from '@/api/login'
import type { HttpResponse } from '@/common/interface'
import { Field, Form } from 'vee-validate'
import type { SubmissionContext } from 'vee-validate'
import { onMounted, ref, toRefs } from 'vue'
import { useAuthStore } from '@/stores'
import Uselogin from '@/hooks/Uselogin'
import { getParam } from '@/utils/common'
import router from '@/router'
import { myalert } from '@/components/modules/alert'
//封装函数
const { state, _getCode, setid } = Uselogin()
const key = ref<string | null>(null) //正常是不能为空，但是如果为空发送请求，就交由后端判断
const password = ref('')
const repassword = ref('')

//pinia
const AuthStore = useAuthStore()
const { code, svg } = toRefs(state)
onMounted(() => {
  key.value = getParam('key')
})
onMounted(() => {
  setid()
  _getCode()
})
//重置密码
const submit = async (value: Record<string, unknown>, actions: SubmissionContext) => {
  const { setErrors } = actions
  const result = await reset({
    key: key.value,
    password: password.value,
    code: state.code,
    sid: AuthStore.sid,
  })
  //明确告知result就是HttpResponse类型
  const { code, msg } = result as HttpResponse
  if (code === 200) {
    actions.resetForm() //清除错误信息
    myalert('密码修改成功')
    localStorage.clear() //保险一点，这里有问题就是登录之后，用户不应再次进入登录注册找回密码这些路由
    setTimeout(() => {
      router.push({ name: 'login' })
    }, 1000)
  } else if (code === 401) {
    setErrors(msg as unknown as Record<string, string>)
  } else {
    myalert(msg as string)
  }
}
</script>

<style></style>
