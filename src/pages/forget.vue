<template>
  <div class="layui-container fly-marginTop">
    <div class="fly-panel fly-panel-user" pad20>
      <div class="layui-tab layui-tab-brief" lay-filter="user">
        <ul class="layui-tab-title">
          <li><RouterLink :to="{ path: '/login' }">登录</RouterLink></li>
          <li class="layui-this">找回密码<!--重置密码--></li>
        </ul>
        <div class="layui-form layui-tab-content" id="LAY_ucm" style="padding: 20px 0">
          <div class="layui-tab-item layui-show">
            <!-- 重置密码 -->
            <!--
          <div class="fly-msg">{{d.username}}，请重置您的密码</div>
          <div class="layui-form layui-form-pane"  style="margin-top: 30px;">
            <form action="/user/repass" method="post">
              <div class="layui-form-item">
                <label for="L_pass" class="layui-form-label">密码</label>
                <div class="layui-input-inline">
                  <input type="password" id="L_pass" name="pass" required lay-verify="required" autocomplete="off" class="layui-input">
                </div>
                <div class="layui-form-mid layui-word-aux">6到16个字符</div>
              </div>
              <div class="layui-form-item">
                <label for="L_repass" class="layui-form-label">确认密码</label>
                <div class="layui-input-inline">
                  <input type="password" id="L_repass" name="repass" required lay-verify="required" autocomplete="off" class="layui-input">
                </div>
              </div>
              <div class="layui-form-item">
                <label for="L_vercode" class="layui-form-label">人类验证</label>
                <div class="layui-input-inline">
                  <input type="text" id="L_vercode" name="vercode" required lay-verify="required" placeholder="请回答后面的问题" autocomplete="off" class="layui-input">
                </div>
                <div class="layui-form-mid">
                  <span style="color: #c00;">{{d.vercode}}</span>
                </div>
              </div>
              <div class="layui-form-item">
                <input type="hidden" name="username" value="{{d.username}}">
                <input type="hidden" name="email" value="{{d.email}}">
                <button class="layui-btn" alert="1" lay-filter="*" lay-submit>提交</button>
              </div>
            </form>
          </div>


          <div class="fly-error">该重置密码链接已失效，请重新校验您的信息</div>
          <div class="fly-error">非法链接，请重新校验您的信息</div>
          -->

            <div class="layui-form layui-form-pane">
              <Form @submit="submit" v-slot="{ errors }">
                <div class="layui-form-item">
                  <label for="L_email" class="layui-form-label">邮箱</label>
                  <div class="layui-input-inline">
                    <Field
                      type="text"
                      as="input"
                      name="username"
                      rules="required|email"
                      placeholder="请输入用户名(邮箱)"
                      autocomplete="off"
                      class="layui-input"
                      v-model="username"
                    />
                  </div>
                  <!-- 错误信息展示 -->
                  <div class="layui-form-mid">
                    <span style="color: #c00">{{ errors.username }}</span>
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
import { forget } from '@/api/login'
import type { HttpResponse } from '@/common/interface'
import { Field, Form } from 'vee-validate'
import { onMounted, reactive, toRefs } from 'vue'
import { useSidStore } from '@/stores'
import Uselogin from '@/hooks/Uselogin'
//封装函数
const { state, _getCode, setid } = Uselogin()

const { username, code, svg } = toRefs(state)
onMounted(() => {
  setid()
  _getCode()
})

//找回密码
const submit = async (value: any, actions: any) => {
  const { setErrors } = actions
  const result = await forget({
    username: state.username,
    code: state.code,
    sid: useSidStore().sid,
  })
  //明确告知result就是HttpResponse类型
  const { code, msg } = result as HttpResponse
  if (code === 200) {
    alert(msg)
  } else if (code === 500) {
    setErrors({
      code: msg,
    })
  }
}
</script>

<style></style>
