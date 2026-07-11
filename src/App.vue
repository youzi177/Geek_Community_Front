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
import '@/assets/layui/css/modules/layer/default/layer.css'
</script>

<style>
.svg svg {
  position: relative;
  top: -12px;
  height: 50px;
}
</style>
