<template>
  <div class="fly-panel" style="margin-bottom: 0">
    <div class="fly-panel-title fly-filter">
      <a :class="{ 'layui-this': status === '' && tag === '' }" @click.prevent="search()">综合</a>
      <span class="fly-mid"></span>
      <a :class="{ 'layui-this': status === '0' }" @click.prevent="search(0)">未结</a>
      <span class="fly-mid"></span>
      <a :class="{ 'layui-this': status === '1' }" @click.prevent="search(1)">已结</a>
      <span class="fly-mid"></span>
      <a :class="{ 'layui-this': status === '' && tag === '精华' }" @click.prevent="search(2)"
        >精华</a
      >
      <span class="fly-filter-right layui-hide-xs">
        <a :class="{ 'layui-this': sort === 'created' }" @click.prevent="search(3)">按最新</a>
        <span class="fly-mid"></span>
        <a :class="{ 'layui-this': sort === 'answer' }" @click.prevent="search(4)">按热议</a>
      </span>
    </div>
    <ListItem :list="lists" @next-page="nextPage" :isEnd="query.isEnd"></ListItem>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, toRefs } from 'vue'
import ListItem from './ListItem.vue'
import { getList } from '@/api/content.ts'
import type { HttpResponse } from '@/common/interface.ts'
const query = reactive({
  status: '', //状态
  tag: '', //标签，精华
  sort: 'created',
  page: 0, //第几页
  limit: 10, //一页显示10条
  catlog: '', //分类
  lists: [
    {
      uid: {
        isVip: 8,
        name: '柚子177',
      },
      title: '帖子的标题',
      content: '',
      created: '2026-7-19 00:00:00',
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
      answer: '100',
    },
    {
      uid: {
        isVip: 8,
        name: '小封鸭',
      },
      title: '帖子的标题',
      content: '',
      created: '2026-7-20 00:00:00',
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
      answer: '100',
    },
  ], //文章详情
  isEnd: false, //是否最后一页
  isRepeat: false, //请求锁
})
const { status, tag, sort, lists } = toRefs(query)
//查询
const search = (val?: number) => {
  switch (val) {
    case 0:
      query.status = '0'
      query.tag = ''
      break
    case 1:
      query.status = '1'
      query.tag = ''
      break
    case 2:
      query.status = ''
      query.tag = '精华'
      break
    case 3:
      query.sort = 'created'
      break
    case 4:
      query.sort = 'answer'
      break

    default:
      query.status = ''
      query.tag = ''
  }
}
//获取文章列表
const _getList = async () => {
  if (query.isEnd) return
  const options = {
    catalog: query.catlog,
    isTop: 0,
    page: query.page,
    limit: query.limit,
    sort: query.sort,
    status: query.status,
  }
  if (query.isRepeat) return //判断是不是锁上了，true锁上，直接return，否则的话继续执行
  try {
    query.isRepeat = true //请求之后把请求锁 锁上
    const result = await getList(options)
    //明确告知result就是HttpResponse类型
    const { code, data } = result as HttpResponse
    if (code === 200) {
      query.isRepeat = false //数据请求完成之后，把锁打开
      //如果小于一页的数据，就是最后一页了
      if (data.length < query.limit) {
        query.isEnd = true
      }
      //判断页面有没有数据，没有就直接赋值
      if (query.lists.length === 0) {
        query.lists = result.data
      } else {
        //页面有数据就concat追加
        query.lists = query.lists.concat(data)
      }
    }
  } catch (error) {
    //console.log(error);

    //错误了也要先把锁打开
    query.isRepeat = false
  }
}
onMounted(_getList())
//下一页
const nextPage = () => {
  query.page++
  _getList()
}
</script>

<style>
a {
  cursor: pointer;
}
</style>
