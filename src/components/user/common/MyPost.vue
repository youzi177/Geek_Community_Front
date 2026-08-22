<template>
  <div>
    <div class="overflow">
      <table class="layui-table" border="0">
        <thead>
          <tr>
            <th>
              <div class="layui-table-cell pl0"><span>贴子标题</span></div>
            </th>
            <th>
              <div class="layui-table-cell text-center"><span>状态</span></div>
            </th>
            <th>
              <div class="layui-table-cell text-center"><span>结贴</span></div>
            </th>
            <th>
              <div class="layui-table-cell text-center"><span>发表时间</span></div>
            </th>
            <th>
              <div class="layui-table-cell text-center"><span>数据</span></div>
            </th>
            <th class="min-cell">
              <div class="layui-table-cell text-center"><span>操作</span></div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr class="text-center" v-for="(item, index) in list" :key="index">
            <td class="text-left">
              <RouterLink :to="{ name: 'detail', params: { tid: item._id } }" class="link">{{
                item.title
              }}</RouterLink>
            </td>
            <td>{{ item.status === '0' ? '打开' : '关闭' }}</td>
            <td :class="{ success: item.isEnd !== '0' }">
              {{ item.isEnd === '0' ? '未结帖' : '已结帖' }}
            </td>
            <td>{{ formatDate(item.created) }}</td>
            <td>{{ item.reads }}阅/{{ item.answer }}答</td>
            <td>
              <div
                class="layui-btn layui-btn-xs"
                :class="{ 'layui-btn-disabled': item.isEnd === '1' }"
                @click="setPage(item)"
              >
                编辑
              </div>
              <div
                class="layui-btn layui-btn-xs layui-btn-danger"
                :class="{ 'layui-btn-disabled': item.isEnd === '1' }"
                @click="deletPost(item)"
              >
                删除
              </div>
            </td>
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
import { deletPostByUid, getPostListByUid } from '@/api/user'
import type { Article, HttpResponse } from '@/common/interface'
import { onMounted, reactive, toRefs } from 'vue'
import pageination from '@/components/modules/pageination/Index.vue'
import { formatDate } from '@/utils/formatDate'
import { useAppStore } from '@/stores'
import { myconfirm } from '@/components/modules/alert'
import router from '@/router'
import { popup } from '@/components/modules/pop'
const AppStore = useAppStore()
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
  getPostList()
})
const getPostList = async () => {
  const result = await getPostListByUid({
    page: current.value,
    limit: limit.value,
  })
  const { code, data, total } = result as HttpResponse
  if (code === 200) {
    list.value = data
    state.total = total
  }
}
// 传递参数
const setPage = (item: Article) => {
  if (item.isEnd === '1') {
    popup('帖子已经结贴，无法编辑', 'shake')
    return
  } else {
    router.push({
      name: 'edit',
      params: { tid: item._id },
    })
    AppStore.setPage(item)
  }
}
//翻页事件
const handleChange = (val: number) => {
  console.log(val)
  current.value = val
  getPostList()
}
// 选择一页多少条
const handleLimit = (limit: number, newCurrent?: number) => {
  state.limit = limit
  if (newCurrent !== undefined) {
    current.value = newCurrent
  }
  getPostList()
}
// 删除贴子
const deletPost = (item: Article) => {
  if (item.isEnd === '1') {
    popup('帖子已经结贴，无法删除', 'shake')
    return
  }
  myconfirm(
    '确定删除吗?',
    async () => {
      console.log('删除贴子', item)
      const result = await deletPostByUid({
        tid: item._id,
      })
      const { code } = result as HttpResponse
      if (code === 200) {
        popup('删除成功', '')
        list.value.splice(list.value.indexOf(item), 1)
      }
    },
    () => {},
  )
}
</script>

<style lang="scss" scoped>
.overflow {
  overflow-y: auto;
}
.min-cell {
  min-width: 80px;
}
.link {
  color: #01aaed;
}
.success {
  color: #5fb878;
}
</style>
