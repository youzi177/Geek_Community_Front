<template>
  <div>
    <div class="overflow">
      <table class="layui-table" border="0">
        <thead>
          <tr>
            <th class="title">
              <div class="layui-table-cell pl0"><span>贴子标题</span></div>
            </th>
            <th>
              <div class="layui-table-cell text-right pr0"><span>收藏时间</span></div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr class="text-center" v-for="(item, index) in list" :key="'mycollect' + index">
            <td class="text-left title">
              <router-link class="link" :to="{ name: 'detail', params: { tid: item.tid } }">{{
                item.title
              }}</router-link>
            </td>
            <td class="text-right">{{ formatDate(item.created) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <pageination
      :has-select="true"
      :hasTotal="true"
      :total="total"
      :size="size"
      :current="current"
      :show-end="true"
      :align="'center'"
      @change-current="handleChange"
      @changeLimit="handleLimit"
      v-show="total > 0"
    ></pageination>
  </div>
</template>

<script lang="ts" setup>
import type { Article, HttpResponse } from '@/common/interface'
import { onMounted, reactive, toRefs } from 'vue'
import pageination from '@/components/modules/pageination/Index.vue'
import { formatDate } from '@/utils/formatDate'
import { getCollect } from '@/api/user'
const state = reactive({
  list: [] as Article[],
  // page: 0,
  limit: 10,
  total: 0,
  size: 10,
  current: 0,
})
const { list, limit, total, size, current } = toRefs(state)
onMounted(() => {
  getCollectList()
})
const getCollectList = async () => {
  const restult = await getCollect({
    page: state.current,
    limit: limit.value,
  })
  const { code, data, total } = restult as HttpResponse
  if (code === 200) {
    list.value = data
    state.total = total
  }
}
//翻页事件
const handleChange = (val: number) => {
  console.log(val)
  current.value = val
  getCollectList()
}
// 选择一页多少条
const handleLimit = (limit: number, newCurrent?: number) => {
  state.limit = limit
  if (newCurrent !== undefined) {
    current.value = newCurrent
  }
  getCollectList()
}
</script>

<style>
.title {
  width: 70%;
}
</style>
