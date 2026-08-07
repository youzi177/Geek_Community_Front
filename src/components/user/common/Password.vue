<template>
  <!-- 修改密码 -->
  <div class="layui-form layui-form-pane layui-tab-item layui-show">
    <Form @submit="submit" v-slot="{ errors }">
      <div class="layui-form-item">
        <label for="L_nowpass" class="layui-form-label">当前密码</label>
        <div class="layui-input-inline">
          <Field
            type="password"
            as="input"
            name="nowpassword"
            rules="required|min:6|max:16"
            placeholder="请输入密码"
            autocomplete="off"
            class="layui-input"
            v-model="oldassword"
          />
        </div>
        <!-- 错误信息展示 -->
        <div class="layui-form-mid">
          <span style="color: #c00">{{ errors.nowpassword }}</span>
        </div>
      </div>
      <div class="layui-form-item">
        <label for="L_pass" class="layui-form-label">新密码</label>
        <div class="layui-input-inline">
          <Field
            type="password"
            as="input"
            name="password"
            rules="required|min:6|max:16"
            placeholder="请输入新密码"
            autocomplete="off"
            class="layui-input"
            v-model="password"
          />
        </div>
        <!-- 错误信息展示 -->
        <div class="layui-form-mid">
          <span style="color: #c00">{{ errors.password }}</span>
        </div>
        <div class="layui-form-mid layui-word-aux">6到16个字符</div>
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
        <button class="layui-btn" key="set-mine" type="submit">确认修改</button>
      </div>
    </Form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, toRefs } from 'vue'
import { Field, Form, type SubmissionContext } from 'vee-validate'

import { myalert } from '@/components/modules/alert'
import { changePassword } from '@/api/user'
import type { HttpResponse } from '@/common/interface'
import { useAuthStore, useUserStore } from '@/stores'
import router from '@/router'
const UserStore = useUserStore()
const AuthStore = useAuthStore()
const state = reactive({
  password: '', //新密码
  oldassword: '', //当前密码
  repassword: '', //确认密码
})
const { password, oldassword, repassword } = toRefs(state)
const submit = async (value: Record<string, unknown>, actions: SubmissionContext) => {
  if (state.oldassword === state.password) {
    myalert('新旧密码不能相同')
    return
  }
  const result = await changePassword({
    oldpwd: state.oldassword,
    newpwd: state.password,
  })
  const { code, msg } = result as HttpResponse
  if (code === 200) {
    myalert('密码修改成功')
    //清除状态
    localStorage.clear()
    UserStore.setUserInfo({
      name: '',
      pic: '',
      isVip: '',
      count: 0,
      favs: 0,
      isSign: false,
      lastSign: null,
    })
    AuthStore.setisLogin(false)
    AuthStore.setToken('')
    //跳转到登录
    setTimeout(() => {
      router.push({ name: 'login' })
    }, 1000)
    actions.resetForm() //清除错误信息
  } else {
    myalert(msg as string)
  }
}
</script>

<style></style>
