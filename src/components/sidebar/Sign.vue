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
      <span class="fly-signin-days" v-show="isLogin"
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
        <button class="layui-btn layui-btn-disabled">{{ msg }}</button>
        <span
          >获得了<cite>{{ favs }}</cite
          >飞吻</span
        >
      </template>
    </div>
    <SignInfo @closeModal="close" :is-show="isShow"></SignInfo>
    <SignList @closeModal="close" :is-show="showList"></SignList>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, onUnmounted, reactive, toRefs } from 'vue'
import SignInfo from './SignInfo.vue'
import SignList from './SignList.vue'
import { useUserStore, useAuthStore } from '@/stores/index.ts'
import { userSign } from '@/api/user.ts'
import type { HttpResponse } from '@/common/interface.ts'
import { myalert } from '../modules/alert/index.tsx'
import { popup } from '../modules/pop/index.tsx'
import moment from 'dayjs'
//pinia
const userStore = useUserStore()
const authStore = useAuthStore()
//数据
const state = reactive({
  isShow: false, //签到说明状态
  showList: false, //签到榜单状态
  isLogin: computed(() => authStore.isLogin), //登录状态
  isSign: computed(() => userStore.userInfo.isSign), //签到状态
  // lists: [], //这个应该放到SignList组件 //签到榜单的数据
  msg: '', //按钮显示文字
})
const { isShow, showList, isLogin, isSign, msg } = toRefs(state)

onMounted(() => {
  //判断用户的上一次签到时间与签到状态
  //如果用户上一次签到的时间与当天签到的时间相差1天，允许用户进行签到
  const isSign = userStore.userInfo.isSign //登录之后有签到是true没有时false，退出登录是false
  console.log('🚀 ~ isSign:', isSign)
  const lastSign = userStore.userInfo.lastSign //后端登录之后会返回lastSign最近的一次签到
  const nowDate = moment().format('YYYY-MM-DD')
  const lastDate = moment(lastSign).format('YYYY-MM-DD')
  const diff = moment(nowDate).diff(moment(lastDate), 'day')
  console.log('🚀 ~ diff:', diff)

  if (diff > 0 && isSign) {
    //用户签到后关闭浏览器，第二天打开isSign还是true，但是diff>0 更新 userStore.userInfo.isSign
    userStore.userInfo.isSign = false
  }
  if (diff === 0 && isSign) {
    // 为什么还需要判断diff === 0
    // 用户签到后关闭浏览器，第二天打开isSign还是true 这里的diff>0 所以不会走这个逻辑
    nextSign()
  }
  // if (diff > 0 && isSign) {
  //   userStore.userInfo.isSign = false
  // } else {
  //   userStore.userInfo.isSign = isSign
  //   if (diff === 0 && isSign) {
  //     nextSign()
  //   } else {
  //     // diff>0 && isSign是false
  //     // console.log('111')
  //     // state.msg = '今日已签到'
  //     //跨天，恢复签到
  //     userStore.userInfo.isSign = false
  //   }
  // }
})

//计算属性
//签到天数
const count = computed(() => userStore.userInfo?.count ?? 0)
//签到积分
const favs = computed(() => {
  const day = count.value + 1
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
    popup('请先登录', 'shake')
    return
  }
  const result = await userSign()
  const { code, favs, count, lastSign } = result as HttpResponse
  const user = userStore.userInfo
  if (code === 200) {
    if (favs !== undefined && count !== undefined) {
      //更新userinfo
      user.favs = favs
      user.count = count
      popup('签到成功')
    }
  } else {
    //用户已经签到
    myalert('用户已经签到')
  }
  // isSign.value = true
  //加入一个issign，签到后更新
  user.isSign = true
  user.lastSign = lastSign! //确定这里不是undefine，签到之后退出重新登录就是undefine

  userStore.setUserInfo(user)
  nextSign()
}
let ctrl: ReturnType<typeof setInterval>
//倒计时，下一次签到
const nextSign = () => {
  clearInterval(ctrl)
  const newDate = moment().add(1, 'day').format('YYYY-MM-DD')
  let seconds = moment(newDate + ' 00:00:00').diff(moment(), 'second')
  // 测试用
  // const newDate = moment().add(10, 'second')
  // let seconds = moment(newDate).diff(moment(), 'second')
  let hour = Math.floor(seconds / 3600)
  let min = Math.floor((seconds % 3600) / 60)
  let second = seconds % 60
  state.msg = `签到倒计时 ${hour}:${min < 10 ? '0' + min : min}:${second < 10 ? '0' + second : second}`
  // if (seconds < 600) {
  ctrl = setInterval(() => {
    seconds = moment(newDate + ' 00:00:00').diff(moment(), 'second')
    // 测试用
    // seconds = moment(newDate).diff(moment(), 'second')
    hour = Math.floor(seconds / 3600)
    min = Math.floor((seconds % 3600) / 60)
    second = seconds % 60
    state.msg = `签到倒计时 ${hour}:${min < 10 ? '0' + min : min}:${second < 10 ? '0' + second : second}`
    if (seconds <= 0) {
      //倒计时结束，清除计时器，并且把签到改为false，并且更新pinia的userInfo的isSign
      clearInterval(ctrl)
      // state.isSign = false
      const user = userStore.userInfo
      user.isSign = false
      // store.commit('setUserInfo', user)
      userStore.setUserInfo(user)
    }
  }, 1000)
}
//组件卸载的时候计时器清除
onUnmounted(() => {
  clearInterval(ctrl)
})
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
}
</style>
