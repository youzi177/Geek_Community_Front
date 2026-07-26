<template>
  <div class="fly-panel fly-panel-user">
    <div class="layui-tab layui-tab-brief">
      <ul class="layui-tab-title">
        <li>
          <RouterLink :to="{ name: 'mypost' }">我的发帖</RouterLink>
        </li>
        <li><RouterLink :to="{ name: 'mycollection' }">我收藏的帖子</RouterLink></li>
      </ul>
      <RouterView></RouterView>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped></style>
