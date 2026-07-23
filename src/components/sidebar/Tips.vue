<template>
  <div class="fly-panel">
    <h3 class="fly-panel-title">温馨通道</h3>
    <div class="fly-panel-main layui-row">
      <ul class="layui-clear y-quick">
        <li class="layui-col-xs6" v-for="(item, index) in lists" :key="'tips' + index">
          <a :href="item.link" target="_blank">{{ item.title }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { getTips } from '@/api/content'
import type { HttpResponse } from '@/common/interface'

interface TipItem {
  title: string
  link: string
}
const lists = ref<TipItem[]>([])
onMounted(async () => {
  const result = await getTips()
  const { code, data } = result as HttpResponse
  if (code === 200) {
    lists.value = data
  }
})
</script>

<style lang="scss" scoped>
$border-color: #f2f2f2;
.fly-panel-main {
  padding: 15px;
}
.y-quick {
  border: 1px solid $border-color;
  border-bottom: none;
  border-right: none;
  .layui-col-xs6 {
    height: 40px;
    line-height: 40px;
    padding: 0 10px;
    border: 1px solid $border-color;
    text-align: center;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    border-top: none;
    border-left: none;
  }
  a {
    display: block;
  }
}
</style>
