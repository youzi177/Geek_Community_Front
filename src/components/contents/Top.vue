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
const query = reactive({
  page: 0,
  limit: 20,
  lists: [
    {
      uid: {
        isVip: 8,
        name: '用户昵称',
      },
      title: '帖子的标题',
      content: '',
      created: '2019-10-01 00:00:00',
      catalog: 'ask',
      fav: '40',
      isEnd: '0',
      reasds: '10',
      status: '0',
      isTop: '0',
      tags: [
        {
          name: '精华',
          class: 'layui-bg-red',
        },
        {
          name: '热门',
          class: 'layui-bg-blue',
        },
      ],
      sort: '0',
      answer: '0',
    },
  ],
})
const { lists } = toRefs(query)
//下一页
const nextPage = () => {
  query.page++
  // _getList()
}
//获取文章列表
// const _getList = () => {
//   const options = {
//     catalog: query.catlog,
//     isTop: 0,
//     page: query.page,
//     limit: query.limit,
//     sort: query.sort,
//     status: query.status,
//   }
//   const res = getList(options)
// }
// onMounted(_getList())
</script>

<style></style>
