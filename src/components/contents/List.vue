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
import { onMounted, reactive, toRefs, watch } from 'vue'
import { useRoute } from 'vue-router'
import ListItem from './ListItem.vue'
import { getList } from '@/api/content.ts'
import type { HttpResponse } from '@/common/interface.ts'
const query = reactive({
  status: '', //状态
  tag: '', //标签，精华
  sort: 'created',
  page: 0, //第几页
  limit: 10, //一页显示10条
  catalog: '', //分类
  lists: [], //文章详情
  isEnd: false, //是否最后一页
  isRepeat: false, //请求锁
  current: '',
})
const { status, tag, sort, lists } = toRefs(query)
const route = useRoute()
//监听未结/已结/精华/最新/热议
watch(
  () => query.current,
  (newVal, oldVal) => {
    // console.log('旧:', oldVal)
    // console.log('新:', newVal)
    query.page = 0
    query.isEnd = false
    query.lists = []
    _getList()
  },
)
//监听分类路由
watch(
  () => route.params.catalog,
  (newVal, oldVal) => {
    // console.log('旧:', oldVal)
    // console.log('新:', newVal)

    console.log(newVal)
    const catalog = newVal
    if (typeof catalog !== 'undefined' && catalog !== '') {
      query.catalog = catalog as string
    }
    query.page = 0
    query.isEnd = false
    query.lists = []
    _getList()
  },
)
//查询未结/已结/精华/最新/热议
const search = (val?: number) => {
  if (typeof val === 'undefined' && query.current === '') {
    return
  }
  if (typeof val === 'undefined') {
    query.current = ''
  } else {
    query.current = String(val)
  }
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
      query.current = ''
  }
}
//获取文章列表
const _getList = async () => {
  if (query.isEnd) return
  const options = {
    catalog: query.catalog,
    isTop: 0,
    page: query.page,
    limit: query.limit,
    sort: query.sort,
    status: query.status,
    tag: query.tag,
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
    //错误了也要先把锁打开
    query.isRepeat = false
  }
}
// 初始化
onMounted(() => {
  //这里首页->其他 是不同的组件所以在组件初始化的时候应该拿到路由参数
  //跳转到其他组件之后，就交给watch处理
  const catalog = route.params.catalog
  //路由参数不是首页，就取路由参数
  if (typeof catalog !== 'undefined' && catalog !== '') {
    query.catalog = String(catalog)
  }
  _getList()
})
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
