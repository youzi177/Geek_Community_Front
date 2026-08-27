<template>
  <div class="fly-panel fly-panel-user" pad20>
    <div class="layui-tab layui-tab-brief" lay-filter="user" id="LAY_msg" style="margin-top: 15px">
      <button class="layui-btn layui-btn-danger" id="LAY_delallmsg">清空全部消息</button>
      <div id="LAY_minemsg" style="margin-top: 10px">
        <!--<div class="fly-none">您暂时没有最新消息</div>-->
        <ul class="mine-msg">
          <li data-id="123">
            <blockquote class="layui-elem-quote">
              <a href="/jump?username=Absolutely" target="_blank"><cite>Absolutely</cite></a
              >回答了您的求解<a target="_blank" href="/jie/8153.html/page/0/#item-1489505778669"
                ><cite>layui后台框架</cite></a
              >
            </blockquote>
            <p>
              <span>1小时前</span
              ><a href="javascript:;" class="layui-btn layui-btn-small layui-btn-danger fly-delete"
                >删除</a
              >
            </p>
          </li>
          <li data-id="123">
            <blockquote class="layui-elem-quote">系统消息：欢迎使用 layui</blockquote>
            <p>
              <span>1小时前</span
              ><a href="javascript:;" class="layui-btn layui-btn-small layui-btn-danger fly-delete"
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
import { getMsg } from '@/api/user'
import type { HttpResponse } from '@/common/interface'
import { onMounted, reactive, toRefs } from 'vue'
import pageination from '@/components/modules/pageination/Index.vue'
const state = reactive({
  lists: [],
  page: 0,
  limit: 10,
  total: 0,
  size: 10,
})
const { lists, page, limit, total, size } = toRefs(state)
const gerMsgAll = async () => {
  const result = await getMsg({ page: page.value, limit: limit.value })
  const { code, data } = result as HttpResponse
  if (code === 200) {
    lists.value = data
  }
}
//翻页事件
const handleChange = (val: number) => {
  page.value = val
  gerMsgAll()
}
// 选择一页多少条
const handleLimit = (limit: number, newCurrent?: number) => {
  state.limit = limit
  if (newCurrent !== undefined) {
    page.value = newCurrent
  }
  gerMsgAll()
}
onMounted(() => {
  gerMsgAll()
})
</script>

<style></style>
