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
interface HotListItem {
  answer: string
  title: string
  _id: string
}
const lists = ref<HotListItem[]>([])
onMounted(async () => {
  const result = await getTop()
  const { code, data } = result as HttpResponse
  if (code === 200) {
    lists.value = data
  }
})
</script>

<style></style>
