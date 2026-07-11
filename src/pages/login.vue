<template>
  <div class="layui-container fly-marginTop">
    <div class="fly-panel fly-panel-user" pad20>
      <div class="layui-tab layui-tab-brief" lay-filter="user">
        <ul class="layui-tab-title">
          <li class="layui-this">登录</li>
          <li><RouterLink :to="{ path: '/reg' }">注册</RouterLink></li>
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
                      rules="required|email"
                      name="username"
                      placeholder="请输入用户名"
                      class="layui-input"
                      v-model="username"
                    ></Field>
                  </div>
                  <!-- 错误信息展示 -->
                  <div class="layui-form-mid">
                    <span style="color: #c00">{{ errors.username }}</span>
                  </div>
                </div>
                <div class="layui-form-item">
                  <label for="L_pass" class="layui-form-label">密码</label>
                  <div class="layui-input-inline">
                    <Field
                      type="password"
                      as="input"
                      rules="required|min:6"
                      name="password"
                      class="layui-input"
                      v-model="password"
                      placeholder="请输入密码"
                    />
                  </div>
                  <!-- 错误信息展示 -->
                  <div class="layui-form-mid">
                    <span style="color: #c00">{{ errors.password }}</span>
                  </div>
                </div>
                <div class="layui-form-item">
                  <label for="L_vercode" class="layui-form-label">验证码</label>
                  <div class="layui-input-inline">
                    <Field
                      type="text"
                      as="input"
                      rules="required|length:4"
                      name="code"
                      placeholder="请输入验证码"
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
                  <button class="layui-btn" @click="login">立即登录</button>
                  <span style="padding-left: 20px">
                    <RouterLink :to="{ path: '/forget' }">忘记密码？</RouterLink>
                  </span>
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
import axios from 'axios'
import { Field, Form } from 'vee-validate'
import { onMounted, reactive, toRefs } from 'vue'
const state = reactive({
  username: '',
  password: '',
  code: '',
  svg: '',
})
const { username, password, code, svg } = toRefs(state)

const login = async () => {}
onMounted(() => {
  axios.get('http://localhost:3000/public/getCaptcha').then((res) => {
    state.svg = res.data.msg
  })
})
const _getCode = () => {
  axios.get('http://localhost:3000/public/getCaptcha').then((res) => {
    state.svg = res.data.msg
  })
}
</script>

<style></style>
