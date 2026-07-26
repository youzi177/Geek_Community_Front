<template>
  <div class="fly-panel fly-panel-user" pad20>
    <div class="layui-tab layui-tab-brief" lay-filter="user">
      <ul class="layui-tab-title" id="LAY_mine">
        <li>
          <router-link :to="{ name: 'info' }"> 我的资料 </router-link>
        </li>
        <li><router-link :to="{ name: 'pic' }"> 头像 </router-link></li>
        <li><router-link :to="{ name: 'password' }"> 密码 </router-link></li>
        <li><router-link :to="{ name: 'accounts' }"> 账号绑定 </router-link></li>
      </ul>
      <div class="layui-tab-content" style="padding: 20px 0">
        <RouterView></RouterView>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
/* 针对 375px 移动端适配 Tab 导航 */
@media screen and (max-width: 480px) {
  .layui-tab-title {
    display: flex !important;
    overflow-x: auto !important; /* 允许横向滑动，防止卡死折行 */
    white-space: nowrap;
    -webkit-overflow-scrolling: touch;
    border-bottom: 1px solid #e2e2e2;
    overflow-y: hidden !important; /* 强制关闭垂直滚动条 */
  }

  .layui-tab-title li {
    flex-shrink: 0; /* 防止 Tab 文字被压缩 */
    padding: 0 12px !important; /* 减小两侧内边距 */
    min-width: auto !important;
  }
}
</style>
