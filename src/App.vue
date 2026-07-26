<template>
  <Header></Header>
  <RouterView></RouterView>
  <Footer></Footer>
</template>

<script lang="ts" setup>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import '@/assets/layui/css/layui.css'
import '@/assets/css/global.css'
</script>

<style lang="scss">
.svg svg {
  position: relative;
  top: -12px;
  height: 50px;
}
.gray {
  color: #999;
}
//用户中心-我的贴子基础样式
.pl0 {
  padding-left: 0;
}
.text-center {
  text-align: center;
}
.text-left {
  text-align: left;
}
.text-right {
  text-align: right;
}
.pr0 {
  padding-right: 0;
}
</style>
