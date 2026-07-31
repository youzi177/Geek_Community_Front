<template>
  <div>
    <dl class="fly-panel fly-list-one">
      <dt class="fly-panel-title">本周热议</dt>
      <template v-if="lists.length > 0">
        <dd v-for="(item, index) in lists" :key="'hotlist' + index">
          <router-link :to="{ name: 'detail', params: { tid: item._id } }">{{
            item.title
          }}</router-link>
          <span>
            <i class="iconfont icon-pinglun1"></i>
            {{ item.answer }}
          </span>
        </dd>
      </template>
      <!-- 无数据时 -->
      <template v-else>
        <div class="fly-none">没有相关数据</div>
      </template>
    </dl>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { getTop } from '@/api/content'
import type { HttpResponse } from '@/common/interface'
// 定义热门列表每一项的数据结构
interface HotListItem {
  answer: number //回答数量
  title: string // 标题
  _id: string //文章ID
}
// 创建响应式数组
// 表示：lists 是 HotListItem 类型的数组
const lists = ref<HotListItem[]>([])
// 组件挂载完成后执行
onMounted(async () => {
  // 调用接口获取热门数据
  const result = await getTop()
  // 类型断言，并解构接口返回的数据
  const { code, data } = result as HttpResponse
  if (code === 200) {
    // 更新响应式数组
    // ref 修改值需要通过 .value
    lists.value = data
  }
})
</script>

<style></style>
