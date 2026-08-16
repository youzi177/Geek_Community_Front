<template>
  <div class="layui-container fly-marginTop fly-user-main">
    <ul class="layui-nav layui-nav-tree layui-inline">
      <li class="layui-nav-item" v-for="item in filteredLists" :key="item.link">
        <!-- :class="{ 'layui-this': isActive(item) }" -->
        <!-- vuerouter3.2 :active-class="item.activeClass" -->
        <RouterLink
          :to="item.params ? { name: item.link, params: item.params() } : { name: item.link }"
          :class="{ 'layui-this': isActive(item) }"
        >
          <i class="layui-icon" :class="item.icon"></i>
          {{ item.name }}
        </RouterLink>
      </li>
    </ul>

    <RouterView />
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useRoute, type RouteParamValue } from 'vue-router'
import { useUserStore } from '@/stores' // 根据你的路径调整
const route = useRoute()
const userStore = useUserStore()
interface MenuItem {
  name: string
  icon: string
  link: string
  match: string[]
  params?: () => Record<string, RouteParamValue>
}
const lists = ref<MenuItem[]>([
  {
    name: '我的主页',
    icon: 'layui-icon-home',
    link: 'user',
    match: ['user'],
    params: () => ({ uid: userStore.userInfo._id || '' }),
  },
  {
    name: '用户中心',
    icon: 'layui-icon-friends',
    link: 'center',
    match: ['center'],
  },
  {
    name: '基本设置',
    icon: 'layui-icon-set',
    link: 'info',
    // activeClass: 'layui-this',
    // 这几个页面都属于基本设置
    match: ['info', 'pic', 'password', 'accounts'],
  },
  {
    name: '我的帖子',
    icon: 'layui-icon-form',
    link: 'mypost',
    match: ['mypost', 'mycollection'],
  },
  {
    name: '我的消息',
    icon: 'layui-icon-reply-fill',
    link: 'msg',
    match: ['msg'],
  },
  {
    name: '其他设置',
    icon: 'layui-icon-component',
    link: 'others',
    match: ['others'],
  },
])
// 过滤掉 _id 不存在时的“我的主页”
const filteredLists = computed(() => {
  return lists.value.filter((item) => {
    if (item.link === 'user') {
      return !!userStore.userInfo?._id
    }
    return true
  })
})
// 判断当前菜单是否应该高亮
const isActive = (item: MenuItem) => {
  return route.matched.some((routeItem) => {
    const name = routeItem.name

    return typeof name === 'string' && item.match.includes(name)
  })
}
</script>

<style lang="scss" scoped>
.layui-nav-tree .layui-nav-item > a.layui-this {
  background-color: #009688;
  color: #fff;
}

.layui-nav-tree .layui-nav-item > a.layui-this:hover {
  background-color: #009688;
  color: #fff;
}
</style>
