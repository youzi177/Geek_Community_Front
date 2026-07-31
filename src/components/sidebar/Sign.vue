<template>
  <div class="fly-panel fly-signin">
    <div class="fly-panel-title">
      签到
      <i class="fly-mid"></i>
      <a href="javascript:;" class="fly-link" id="LAY_signinHelp" @click="showInfo">说明</a>
      <i class="fly-mid"></i>
      <a href="javascript:;" class="fly-link" @click="showTop"
        >活跃榜<span class="layui-badge-dot"></span
      ></a>
      <span class="fly-signin-days"
        >已连续签到<cite>{{ count }}</cite
        >天</span
      >
    </div>
    <div class="fly-panel-main fly-signin-main">
      <template v-if="!isSign">
        <button class="layui-btn layui-btn-danger" id="LAY_signin" @click="sign">今日签到</button>
        <span
          >可获得<cite>{{ favs }}</cite
          >飞吻</span
        ></template
      >
      <template v-else>
        <!-- 已签到状态 -->
        <button class="layui-btn layui-btn-disabled">今日已签到</button>
        <span
          >获得了<cite>{{ favs }}</cite
          >飞吻</span
        >
      </template>
    </div>
    <SignInfo @closeModal="close" :is-show="isShow"></SignInfo>
    <SignList @closeModal="close" :is-show="showList" :lists="lists"></SignList>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import SignInfo from './SignInfo.vue'
import SignList from './SignList.vue'
import { useUserStore, useAuthStore } from '@/stores/index.ts'
import { userSign } from '@/api/user.ts'
import type { HttpResponse } from '@/common/interface.ts'
import { myalert } from '../modules/alert/index.tsx'
import { popup } from '../modules/pop/index.tsx'
//pinia
const userStore = useUserStore()
const authStore = useAuthStore()

const isShow = ref(false) //签到说明的显示与否
const showList = ref(false) //签到榜单的显示与否
const isLogin = ref(authStore.isLogin) //签到榜单的显示与否
const isSign = ref(userStore.userInfo.isSign ? userStore.userInfo.isSign : false) //是否签到
//父组件不应该发送请求，因为没必要页面加载就去请求签到榜单，而是等点击到签到榜单才去请求接口合理
const lists = ref([
  {
    name: 'test1',
    count: 4,
    created: '2026-07-29',
  },
  {
    name: 'test1',
    count: 4,
    created: '2026-07-29',
  },
  {
    name: 'test1',
    count: 4,
    created: '2026-07-29',
  },
]) //签到榜单的数据

//计算属性
//签到天数
const count = computed(() => userStore.userInfo?.count ?? 0)
//签到积分
const favs = computed(() => {
  let day = count.value
  let result = 0
  if (day < 5) {
    result = 5
  } else if (day >= 5 && day < 15) {
    result = 10
  } else if (day >= 15 && day < 30) {
    result = 15
  } else if (day >= 30 && day < 100) {
    result = 20
  } else if (day >= 100 && day < 365) {
    result = 30
  } else if (day >= 365) {
    result = 50
  }
  return result
})
//签到说明的显示与否
const showInfo = () => {
  isShow.value = true
}
//榜单显示与否
const showTop = () => {
  showList.value = true
}
//签到榜单的显示与否
const close = () => {
  isShow.value = false
  showList.value = false
}
// 签到
const sign = async () => {
  if (!isLogin.value) {
    //myalert('请先登录')
    popup('请先登录', 'shake')
    return
  }
  const result = await userSign()
  const { code, favs, count } = result as HttpResponse
  const user = userStore.userInfo
  if (code === 200) {
    isSign.value = true
    if (favs !== undefined && count !== undefined) {
      //更新userinfo
      user.favs = favs
      user.count = count
      //加入一个issign
      //user.isSign = true
      userStore.setUserInfo(user)
    }
  } else {
    //用户已经签到
    myalert('用户已经签到')
  }
}
</script>

<style lang="scss">
@keyframes bounceIn {
  0% {
    opacity: 0;
    transform: scale(0.5);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
.mask {
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 20000;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.layui-layer {
  position: fixed;
  width: 300px;
  height: 480px;
  top: 50%;
  left: 50%;
  margin-top: -240px;
  margin-left: -150px;
  background: #fff;
  z-index: 21000;
  &.active {
    animation-fill-mode: both;
    animation-duration: 0.2s;
    animation-name: bounceIn;
  }
  .layui-layer-title {
    height: 42px;
    line-height: 42px;
    padding: 0 20px;
    color: #333;
    background-color: #f8f8f8;
  }
  .layui-layer-content {
    padding: 20px;
  }
}
.layui-tab-content {
  padding: 0 10px;
}
.layui-tab-item {
  line-height: 45px;
  li {
    border-bottom: 1px dotted #dcdcdc;
    &:last-child {
      border-bottom: none;
    }
  }
  img {
    width: 30px;
    height: 30px;
    border-radius: 2px;
  }
}
//解决新版layui 间隔问题
.layui-text p {
  margin: 0;
}
</style>
