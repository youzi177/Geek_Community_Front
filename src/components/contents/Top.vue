<template>
  <div class="fly-panel" v-show="lists.length > 0">
    <div class="fly-panel-title fly-filter">
      <a>置顶</a>
      <a
        href="#signin"
        class="layui-hide-sm layui-show-xs-block fly-right"
        id="LAY_goSignin"
        style="color: #ff5722"
        >去签到</a
      >
    </div>
    <ListItem :list="lists" :is-show="false"></ListItem>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, toRefs } from 'vue'
import ListItem from './ListItem.vue'
import { getList } from '@/api/content.ts'
import type { HttpResponse } from '@/common/interface.ts'
const query = reactive({
  status: '',
  tag: '', // 精华标签
  sort: 'created', // 按最新，按热议
  page: 0, //
  limit: 10, // 一页显示10条
  lists: [], // 文章详情
})
const { lists } = toRefs(query)
//下一页
const nextPage = () => {
  query.page++
  _getList()
}
//获取文章列表
const _getList = async () => {
  const options = {
    isTop: 1,
    page: query.page,
    limit: query.limit,
    tag: query.tag,
    sort: query.sort,
    status: query.status,
  }
  const result = await getList(options)
  const { code, data } = result as HttpResponse
  if (code === 200) {
    query.lists = data
  }
}
onMounted(_getList)
</script>

<style></style>
