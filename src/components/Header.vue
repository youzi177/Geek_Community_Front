<template>
  <div>
    <div class="fly-header layui-bg-black">
      <div class="layui-container">
        <a class="fly-logo" href="/">
          <img src="../assets/images/logo.png" alt="layui" />
        </a>
        <!-- <ul class="layui-nav fly-nav layui-hide-xs">
          <li class="layui-nav-item layui-this">
            <a href="/"><i class="iconfont icon-jiaoliu"></i>交流</a>
          </li>
          <li class="layui-nav-item">
            <a href="case/case.html"><i class="iconfont icon-iconmingxinganli"></i>案例</a>
          </li>
          <li class="layui-nav-item">
            <a href="/" target="_blank"><i class="iconfont icon-ui"></i>框架</a>
          </li>
        </ul> -->

        <ul class="layui-nav fly-nav-user">
          <template v-if="!isShow">
            <!-- 未登入的状态 -->
            <li class="layui-nav-item">
              <a class="iconfont icon-touxiang layui-hide-xs" href="../user/login.html"></a>
            </li>
            <li class="layui-nav-item"><RouterLink :to="{ name: 'login' }">登录</RouterLink></li>
            <li class="layui-nav-item">
              <RouterLink :to="{ name: 'reg' }">注册</RouterLink>
            </li>
          </template>
          <template v-else>
            <!-- 登入后的状态 -->
            <li class="layui-nav-item" @mousemove="show" @mouseleave="hide">
              <a class="fly-nav-avatar" href="javascript:;">
                <cite class="layui-hide-xs">{{ userInfo.name }}</cite>
                <i class="iconfont icon-renzheng layui-hide-xs" title="认证信息：layui 作者"></i>
                <i class="layui-badge fly-badge-vip layui-hide-xs" v-show="userInfo.isVip !== '0'"
                  >VIP{{ userInfo.isVip }}</i
                >
                <img :src="userInfo.pic" />
              </a>
              <!-- layui动画：layui-anim layui-anim-up -->
              <dl
                class="layui-nav-child layui-anim layui-anim-up"
                :class="{ 'layui-show': ishover }"
              >
                <dd>
                  <a href="user/set.html"><i class="layui-icon">&#xe620;</i>基本设置</a>
                </dd>
                <dd>
                  <a href="user/message.html"
                    ><i class="iconfont icon-tongzhi" style="top: 4px"></i>我的消息</a
                  >
                </dd>
                <dd>
                  <a href="user/home.html"
                    ><i class="layui-icon" style="margin-left: 2px; font-size: 22px">&#xe68e;</i
                    >我的主页</a
                  >
                </dd>
                <hr style="margin: 5px 0" />
                <dd><a href="/user/logout/" style="text-align: center">退出</a></dd>
              </dl>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useAuthStore, useUserStore } from '@/stores'
import { computed, ref } from 'vue'
//是否登录
const isShow = computed(() => {
  return useAuthStore().isLogin
})
//用户信息
const userInfo = computed(() => {
  return (
    useUserStore().userInfo || {
      name: '',
      pic: '',
      isVip: '0',
    }
  )
})
const ishover = ref(false)
const hoverCtrl = ref<ReturnType<typeof setTimeout> | null>(null)
//鼠标移入的时候显示
const show = () => {
  //清除定时器
  if (hoverCtrl.value) {
    clearTimeout(hoverCtrl.value)
  }
  hoverCtrl.value = setTimeout(() => {}, 200)
  ishover.value = true
}
//鼠标移出的时候隐藏
const hide = () => {
  //清除定时器
  if (hoverCtrl.value) {
    clearTimeout(hoverCtrl.value)
  }
  hoverCtrl.value = setTimeout(() => {
    ishover.value = false
  }, 500)
}
</script>

<style></style>
