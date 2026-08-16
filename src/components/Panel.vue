<template>
  <div class="fly-panel fly-column">
    <div class="layui-container">
      <ul class="layui-clear">
        <li class="layui-hide-xs" :class="{ 'layui-this': $route.path === '/' }">
          <RouterLink :to="{ name: 'index' }">首页</RouterLink>
        </li>
        <li
          v-for="(item, index) in lists"
          :key="'panel' + index"
          :class="{ 'layui-this': $route.path === item.path }"
        >
          <RouterLink :to="item.path">
            {{ item.name }}
            <span class="layui-badge-dot" v-if="item.isNew"></span>
          </RouterLink>
        </li>
        <template v-if="isLogin">
          <!-- 用户登入后显示 -->
          <li class="layui-hide-xs layui-hide-sm layui-show-md-inline-block">
            <RouterLink :to="{ name: 'mypost' }">我发表的贴</RouterLink>
          </li>
          <li class="layui-hide-xs layui-hide-sm layui-show-md-inline-block">
            <RouterLink :to="{ name: 'mycollection' }">我收藏的贴</RouterLink>
          </li>
        </template>
      </ul>

      <div class="fly-column-right layui-hide-xs">
        <span class="fly-search"><i class="layui-icon"></i></span>

        <!-- <a href="jie/add.html" class="layui-btn">发表新帖</a> -->
        <RouterLink :to="{ name: 'add' }" class="layui-btn">发表新帖</RouterLink>
      </div>
      <div
        class="layui-hide-sm layui-show-xs-block"
        style="margin-top: -10px; padding-bottom: 10px; text-align: center"
      >
        <RouterLink :to="{ name: 'add' }" class="layui-btn">发表新帖</RouterLink>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { useAuthStore } from '@/stores'
import { storeToRefs } from 'pinia'
const lists = reactive([
  { name: '提问', path: '/index/ask', isNew: false },
  { name: '分享', path: '/index/share', isNew: false },
  { name: '讨论', path: '/index/discuss', isNew: true },
  { name: '建议', path: '/index/advise', isNew: false },
  { name: '公告', path: '/index/notice', isNew: false },
  { name: '动态', path: '/index/logs', isNew: false },
])
const { isLogin } = storeToRefs(useAuthStore())
</script>

<style></style>
