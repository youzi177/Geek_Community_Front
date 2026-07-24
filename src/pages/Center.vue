<template>
  <div class="layui-container fly-marginTop fly-user-main">
    <ul class="layui-nav layui-nav-tree">
      <li class="layui-nav-item" v-for="item in lists">
        <a href="javascript:;">
          <i class="layui-icon" :class="item.icon"></i>
          {{ item.name }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const lists = ref([
  {
    name: '我的主页',
    icon: 'layui-icon-home',
  },
  {
    name: '用户中心',
    icon: 'layui-icon-friends',
  },
  {
    name: '基本设置',
    icon: 'layui-icon-set',
  },
  {
    name: '我的帖子',
    icon: 'layui-icon-form',
  },
  {
    name: '我的消息',
    icon: 'layui-icon-reply-fill',
  },
])
</script>

<style></style>
