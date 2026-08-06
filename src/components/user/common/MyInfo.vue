<template>
  <!-- 基本信息 -->
  <div class="layui-form layui-form-pane layui-tab-item layui-show">
    <Form @submit="submit" v-slot="{ errors }" class="">
      <div class="layui-form-item">
        <label for="L_email" class="layui-form-label">邮箱</label>
        <div class="layui-input-inline">
          <Field
            as="input"
            rules="required|email"
            type="text"
            name="username"
            placeholder="请输入用户名"
            class="layui-input"
            v-model="username"
          />
        </div>
        <!-- 错误信息展示 -->
        <div class="layui-form-mid">
          <span style="color: #c00">{{ errors.username }}</span>
        </div>
        <!-- <div class="layui-form-mid layui-word-aux">
          如果您在邮箱已激活的情况下，变更了邮箱，需<a
            href="activate.html"
            style="font-size: 12px; color: #4f99cf"
            >重新验证邮箱</a
          >
        </div> -->
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
      <!-- 城市 -->
      <div class="layui-form-item">
        <label for="L_city" class="layui-form-label">城市</label>
        <div class="layui-input-inline">
          <input type="text" name="city" class="layui-input" v-model="location" />
        </div>
      </div>
      <!-- 性别选择 -->
      <div class="layui-form-item">
        <label for="L_city" class="layui-form-label">性别</label>
        <div class="layui-input-inline gray mt1 ml1">
          <label for="gender1" class="mr1">
            <input id="gender1" type="radio" name="sex" v-model="gender" value="0" title="男" />
            <i
              class="layui-icon layui-icon-circle"
              :class="gender === '0' ? 'layui-icon-radio' : 'layui-icon-circle'"
            ></i>
            男
          </label>
          <label for="gender2">
            <input id="gender2" type="radio" name="sex" v-model="gender" value="1" title="女" />
            <i
              class="layui-icon layui-icon-circle"
              :class="gender === '1' ? 'layui-icon-radio' : 'layui-icon-circle'"
            ></i>
            女
          </label>
        </div>
      </div>
      <div class="layui-form-item layui-form-text">
        <label for="L_sign" class="layui-form-label">签名</label>
        <div class="layui-input-block">
          <textarea
            placeholder="随便写些什么刷下存在感"
            class="layui-textarea"
            style="height: 80px"
            v-model="regmark"
          ></textarea>
        </div>
      </div>
      <div class="layui-form-item">
        <button class="layui-btn" type="submit">确认修改</button>
      </div>
    </Form>
  </div>
</template>

<script lang="ts" setup>
import { Field, Form, type SubmissionContext } from 'vee-validate'
import { onMounted, reactive, toRefs } from 'vue'
import { updateUserInfo } from '@/api/user'
import type { HttpResponse } from '@/common/interface'
import { myalert } from '@/components/modules/alert'
import { useUserStore } from '@/stores'

const UserStore = useUserStore()
const state = reactive({
  username: '', //用户名
  name: '', //昵称
  location: '', //城市
  gender: '', //性别
  regmark: '', //个性签名
})
const { username, name, location, gender, regmark } = toRefs(state)

const submit = async (value: Record<string, unknown>, actions: SubmissionContext) => {
  const { setErrors } = actions
  const result = await updateUserInfo({
    username: state.username,
    name: state.name,
    location: state.location,
    gender: state.gender,
    regmark: state.regmark,
  })
  const { code, msg } = result as HttpResponse
  if (code === 200) {
    UserStore.setUserInfo({
      //不应该立即更新邮箱的缓存，只有用户点击邮件确认修改之后，清除缓存重新登录
      // username: state.username,
      name: state.name,
      location: state.location,
      gender: state.gender,
      regmark: state.regmark,
    })
    myalert(msg as string)
  } else if (code === 500) {
    myalert(msg as string)
  } else {
    //as Record<string, string> 是我确定返回的就是对象
    setErrors(msg as unknown as Record<string, string>)
  }
}
onMounted(() => {
  const { username, name, location, gender, regmark } = UserStore.userInfo
  state.username = username || ''
  state.name = name || ''
  state.location = location || ''
  state.gender = gender || ''
  state.regmark = regmark || ''
})
</script>

<style lang="scss" scoped>
.layui-icon-radio {
  color: #5fb878;
}
</style>
