<template>
  <div class="fly-panel fly-link">
    <h3 class="fly-panel-title">友情链接</h3>
    <dl class="fly-panel-main">
      <dd v-for="(item, index) in lists" :key="'links' + index">
        <a :href="item.link" target="_blank">{{ item.title }}</a>
      </dd>
      <dd><a href="mailto:youzi177@126.com" class="fly-link">申请友链</a></dd>
    </dl>
  </div>
</template>

<script lang="ts" setup>
import { getLinks } from '@/api/content'
import type { HttpResponse } from '@/common/interface'
import { onMounted, ref } from 'vue'

interface LinkItem {
  title: string
  link: string
}
const lists = ref<LinkItem[]>([])
onMounted(async () => {
  const result = await getLinks()
  const { code, data } = result as HttpResponse
  if (code === 200) {
    lists.value = data
  }
})
</script>

<style></style>
