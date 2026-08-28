<template>
  <div class="fly-panel fly-panel-user" pad20>
    <div class="layui-tab layui-tab-brief" lay-filter="user" id="LAY_msg" style="margin-top: 15px">
      <button class="layui-btn layui-btn-danger" id="LAY_delallmsg" @click="clearAll">
        清空全部消息
      </button>
      <button class="layui-btn">一键已读</button>
      <p class="tip">清空全部消息会看不到历史记录，一键已读会消除提示但是保留看见历史记录</p>
      <div id="LAY_minemsg" style="margin-top: 10px">
        <div class="fly-none" v-if="lists.length === 0">您暂时没有最新消息</div>
        <ul class="mine-msg" v-else>
          <li v-for="(item, index) in lists" :key="'comments' + index">
            <blockquote class="layui-elem-quote">
              <router-link :to="{ name: 'user', params: { uid: item.cuid._id } }"
                ><cite>{{ item.cuid.name }}</cite></router-link
              >
              回答了您的求解
              <router-link :to="{ name: 'detail', params: { tid: item.tid._id } }">
                <cite>{{ item.tid.title }}</cite>
              </router-link>
            </blockquote>
            <div v-richtext="item.content"></div>
            <p>
              <span>{{ formatDate(item.created) }}</span
              ><a
                href="javascript:;"
                class="layui-btn layui-btn-small layui-btn-danger fly-delete"
                @click="clear(item)"
                >删除</a
              >
            </p>
          </li>
        </ul>
        <pageination
          :has-select="true"
          :hasTotal="true"
          :total="total"
          :size="size"
          :current="page"
          :show-end="true"
          :align="'center'"
          @change-current="handleChange"
          @changeLimit="handleLimit"
          v-show="total > 0"
        ></pageination>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getMsg, setMsg } from '@/api/user'
import type { HttpResponse, Msginfo } from '@/common/interface'
import { onMounted, reactive, toRefs, watch } from 'vue'
import pageination from '@/components/modules/pageination/Index.vue'
import { formatDate } from '@/utils/formatDate'
import { myconfirm } from '../modules/alert'
import { useWebsocketStore } from '@/stores'
import { storeToRefs } from 'pinia'
const WebsocketStore = useWebsocketStore()
const { num } = storeToRefs(WebsocketStore)
watch(
  () => num.value,
  (newval, oldval) => {
    console.log('🚀 ~ oldval:', oldval)
    console.log('🚀 ~ newval:', newval)

    if (newval.event && newval !== oldval && newval.message !== 0) {
      getMsgAll()
    }
  },
)
const state = reactive({
  lists: [] as Msginfo[],
  page: 0,
  limit: 10,
  total: 0,
  size: 10,
})
const { lists, page, limit, total, size } = toRefs(state)
const getMsgAll = async () => {
  const result = await getMsg({ page: page.value, limit: limit.value })
  const { code, data, total } = result as HttpResponse
  if (code === 200) {
    lists.value = data
    state.total = total
  }
}
//翻页事件
const handleChange = (val: number) => {
  page.value = val
  getMsgAll()
}
// 选择一页多少条
const handleLimit = (limit: number, newCurrent?: number) => {
  state.limit = limit
  if (newCurrent !== undefined) {
    page.value = newCurrent
  }
  getMsgAll()
}
// 清空全部消息
const clearAll = () => {
  myconfirm(
    '确定清空所有消息吗?',
    async () => {
      const result = await setMsg()
      const { code } = result as HttpResponse
      if (code === 200) {
        lists.value = []
        useWebsocketStore().setMessage({
          message: 0,
        })
        total.value = 0
      }
    },
    () => {},
  )
}
const clear = async (item: Msginfo) => {
  const result = await setMsg({
    id: item._id,
  })
  const { code } = result as HttpResponse
  if (code === 200) {
    // 设置特定消息已读
    getMsgAll()
    useWebsocketStore().setMessage({
      message: useWebsocketStore().num.message - 1,
    })
  }
}
onMounted(() => {
  getMsgAll()
})
</script>

<style scoped>
.tip {
  width: 100%;
  margin-top: 10px;
  font-size: 12px;
  color: #999;
}
</style>
