<template>
  <div class="layui-container fly-marginTop">
    <div class="fly-panel fly-panel-user" pad20>
      <div class="layui-tab layui-tab-brief" lay-filter="user">
        <ul class="layui-tab-title">
          <li><RouterLink :to="{ path: '/login' }">登录</RouterLink></li>
          <li class="layui-this">注册</li>
        </ul>
        <div class="layui-form layui-tab-content" id="LAY_ucm" style="padding: 20px 0">
          <div class="layui-tab-item layui-show">
            <div class="layui-form layui-form-pane">
              <Form ref="object" v-slot="{ validate, errors }">
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
                  <button class="layui-btn" lay-submit type="button" @click="submit(validate)">
                    立即注册
                  </button>
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
import { getCode } from '@/api/login'

import { Field, Form } from 'vee-validate'
import { onMounted, reactive, toRefs } from 'vue'
const state = reactive({
  username: '',
  password: '',
  repassword: '',
  code: '',
  svg: '',
  name: '',
})
const { name, username, password, repassword, code, svg } = toRefs(state)

onMounted(() => {
  _getCode()
})
const _getCode = () => {
  getCode().then((res) => {
    state.svg = res.msg
  })
}
const submit = async (validate: any) => {
  const { valid } = await validate()
  if (!valid) {
    console.log('校验失败')
    return
  }

  console.log(state.username, state.password, state.name)

  console.log('登录成功')
}
</script>

<style></style>
