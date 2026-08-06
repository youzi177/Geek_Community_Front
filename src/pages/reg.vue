<template>
  <div class="layui-container fly-marginTop">
    <div class="fly-panel fly-panel-user" pad20>
      <div class="layui-tab layui-tab-brief" lay-filter="user">
        <ul class="layui-tab-title">
          <li><RouterLink :to="{ name: 'login' }">登录</RouterLink></li>
          <li class="layui-this">注册</li>
        </ul>
        <div class="layui-form layui-tab-content" id="LAY_ucm" style="padding: 20px 0">
          <div class="layui-tab-item layui-show">
            <div class="layui-form layui-form-pane">
              <Form @submit="submit" v-slot="{ errors }">
                <div class="layui-form-item">
                  <label for="L_email" class="layui-form-label">用户名</label>
                  <div class="layui-input-inline">
                    <Field
                      type="text"
                      as="input"
                      name="username"
                      placeholder="请输入邮箱"
                      rules="required|email"
                      autocomplete="off"
                      class="layui-input"
                      v-model="username"
                    />
                  </div>
                  <div class="layui-form-mid layui-word-aux">将会成为您唯一的登入名</div>
                  <!-- 错误信息展示 -->
                  <div class="layui-form-mid">
                    <span style="color: #c00">{{ errors.username }}</span>
                  </div>
                </div>
                <div class="layui-form-item">
                  <label for="L_username" class="layui-form-label">昵称</label>
                  <div class="layui-input-inline">
                    <Field
                      type="text"
                      as="input"
                      rules="required|min:3|name"
                      placeholder="请输入昵称"
                      name="name"
                      autocomplete="off"
                      class="layui-input"
                      v-model="name"
                    />
                  </div>
                  <div class="layui-form-mid">
                    <span style="color: #c00">{{ errors.name }}</span>
                  </div>
                </div>
                <div class="layui-form-item">
                  <label for="L_pass" class="layui-form-label">密码</label>
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
                  <div class="layui-form-mid layui-word-aux">6到16个字符</div>
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
                      placeholder="请重新输入密码"
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
                <!-- <div class="layui-form-item">
                  <label for="L_vercode" class="layui-form-label">邮箱验证码</label>
                  <div class="layui-input-inline">
                    <Field
                      type="text"
                      name="emailCode"
                      as="input"
                      placeholder="请输入邮箱验证码"
                      rules="required"
                      autocomplete="off"
                      class="layui-input"
                      v-model="emailCode"
                    />
                  </div>
                  <button
                    class="layui-btn"
                    type="button"
                    @click="SendCode"
                    :class="{ 'lay-disabled': isClick }"
                  >
                    {{ emailCodeMsg }}
                  </button>

                  <div class="layui-form-mid">
                    <span style="color: #c00">{{ errors.emailCode }}</span>
                  </div>
                </div> -->
                <div class="layui-form-item">
                  <label for="L_vercode" class="layui-form-label">验证码</label>
                  <div class="layui-input-inline">
                    <Field
                      type="text"
                      name="code"
                      as="input"
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
                  <!-- 错误信息展示 -->
                  <div class="layui-form-mid">
                    <span style="color: #c00">{{ errors.code }}</span>
                  </div>
                </div>
                <div class="layui-form-item">
                  <button class="layui-btn" lay-submit type="submit">立即注册</button>
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
import { reg } from '@/api/login'
import { Field, Form, type SubmissionContext } from 'vee-validate'
import { onMounted, toRefs } from 'vue'
import Uselogin from '@/hooks/Uselogin'
import { useAuthStore } from '@/stores'
import type { HttpResponse } from '@/common/interface'
import { myalert } from '@/components/modules/alert'
import router from '@/router'

//封装函数
const { state, _getCode, setid } = Uselogin()
const { name, username, password, repassword, code, svg } = toRefs(state)
//pinia
const AuthStore = useAuthStore()
//挂载时执行
onMounted(() => {
  setid()
  _getCode()
})
//注册
const submit = async (value: Record<string, unknown>, actions: SubmissionContext) => {
  const { setErrors } = actions
  const result = await reg({
    username: state.username,
    password: state.password,
    name: state.name,
    code: state.code,
    sid: AuthStore.sid,
  })
  //明确告知result就是HttpResponse类型
  const { code, msg } = result as HttpResponse
  if (code === 200) {
    actions.resetForm() //清除错误信息
    myalert(msg as string)
    router.push({ name: 'login' })
  } else if (code === 401) {
    //这里比较特殊，msg是对象， setErrors(msg)是可以正常的，但是会ts报错
    //因为msg是string，所以需要unknown中转一下
    //as Record<string, string> 是我确定返回的就是对象
    setErrors(msg as unknown as Record<string, string>)
  }
}
</script>

<style></style>
