<template>
  <div class="layui-container fly-marginTop fly-user-main">
    <ul class="layui-nav layui-nav-tree layui-inline">
      <li class="layui-nav-item" v-for="item in lists">
        <RouterLink :to="{ name: item.link }"
          ><i class="layui-icon" :class="item.icon"></i>{{ item.name }}</RouterLink
        >
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
    link: 'user',
  },
  {
    name: '用户中心',
    icon: 'layui-icon-friends',
    link: 'center',
  },
  {
    name: '基本设置',
    icon: 'layui-icon-set',
    link: 'set',
  },
  {
    name: '我的帖子',
    icon: 'layui-icon-form',
    link: 'posts',
  },
  {
    name: '我的消息',
    icon: 'layui-icon-reply-fill',
    link: 'msg',
  },
  {
    name: '其他设置',
    icon: 'layui-icon-component',
    link: 'others',
  },
])
</script>

<style lang="scss" scoped>
//解决layui-this 鼠标hover的样式问题
.layui-nav-tree .layui-nav-item > a.layui-this {
  background-color: #009688;
  color: #fff;
}

.layui-nav-tree .layui-nav-item > a.layui-this:hover {
  background-color: #009688;
  color: #fff;
}
</style>
