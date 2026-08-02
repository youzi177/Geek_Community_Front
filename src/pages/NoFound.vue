<template>
  <div class="layui-container fly-marginTop">
    <div class="fly-panel">
      <div class="fly-none">
        <h2><i class="iconfont icon-404"></i></h2>
        <p>页面或者数据被 纸飞机运到火星了，啥都看不到了…</p>
        <RouterLink :to="{ name: 'index' }" class="layui-btn">回到首页</RouterLink>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { RouterLink } from 'vue-router'
</script>

<style lang="scss" scoped>
p {
  padding-bottom: 15px;
}
</style>
