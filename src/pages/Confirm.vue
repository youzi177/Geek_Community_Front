<template>
  <div class="layui-container flex">
    <div class="layui-row font pb3">确定更新账号为：{{ username }}吗？</div>
    <div class="layui-row">
      <button
        type="button"
        class="layui-btn"
        :class="{ 'layui-btn-disabled': isSend }"
        @click="submit"
      >
        确定更新
      </button>
      <router-link class="layui-btn layui-btn-primary" to="/">返回首页</router-link>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { updateUsername } from '@/api/user'
import type { HttpResponse } from '@/common/interface'
import { myalert } from '@/components/modules/alert'
import router from '@/router'
import { onMounted, reactive, toRefs } from 'vue'
let obj = { username: '' }
const state = reactive({
  username: '',
  isSend: false,
})
const { username, isSend } = toRefs(state)

onMounted(() => {
  const queryStr = window.location.href.replace(/.*\?/, '')
  // 获取URL参数
  obj = Object.fromEntries(queryStr.split('&').map((v) => v.split('=')))
  //console.log('🚀 ~ obj:', obj.username)
  state.username = decodeURIComponent(obj.username) //解决前端显示@符号问题
})
const submit = async () => {
  obj.username = state.username
  const result = await updateUsername(obj)
  const { code, msg } = result as HttpResponse
  if (code === 200) {
    myalert(msg as string)
    state.isSend = true
    //修改邮箱之后应该清除缓存，然后重新登录
    localStorage.clear()
    setTimeout(() => {
      router.push({ name: 'login' })
    }, 1000)
  }
}
</script>

<style lang="scss" scoped>
.flex {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  min-height: 260px;
}
.font {
  font-size: 16px;
  color: #333;
}
</style>
