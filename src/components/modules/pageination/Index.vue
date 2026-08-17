<template>
  <div
    class="d-flex"
    :class="{
      'flex-center': align === 'center',
      'flex-start': align === 'left',
      'flex-end': align === 'right',
    }"
  >
    <div class="layui-box layui-laypage layui-laypage-default">
      <!-- prev第一页 -->
      <a
        class="layui-laypage-prev"
        v-show="showEnd"
        :class="{ 'layui-disabled': current === 0 }"
        @click.prevent="home"
        ><i class="layui-icon layui-icon-prev" v-if="showType === 'icon'"></i>
        <template v-else>首页</template>
      </a>
      <!-- left上一页 -->
      <a :class="{ 'layui-disabled': current === 0 }" @click.prevent="prev"
        ><i class="layui-icon layui-icon-left" v-if="showType === 'icon'"></i>
        <template v-else>上一页</template>
      </a>
      <!-- <a href="javascript:;" data-page="1" :class="[true ? theme : '', true ? 'active' : '']">1</a> -->
      <!-- current+2<pages.lenght 显示... -->
      <!-- current-2>1 显示... -->
      <a
        v-if="pages.length > 5 && current + 1 - 2 > 1"
        href="javascript:;"
        data-page="2"
        class="layui-disabled"
        >...</a
      >
      <template v-for="(item, index) in pages" :key="index">
        <a
          v-if="item >= current + 1 - 2 && item <= current + 1 + 2"
          data-page="2"
          :class="[current === index ? theme : '', current === index ? 'active' : '']"
          @click="changeIndex(index)"
          >{{ item }}</a
        >
      </template>
      <a
        v-if="pages.length > 5 && current + 1 + 2 < pages.length"
        href="javascript:;"
        data-page="2"
        class="layui-disabled"
        >...</a
      >

      <!-- right下一页 -->
      <a :class="{ 'layui-disabled': current === pages.length - 1 }" @click.prevent="next">
        <i class="layui-icon layui-icon-right" v-if="showType === 'icon'"></i>
        <template v-else>下一页</template>
      </a>
      <!-- next尾页 -->
      <a
        class="layui-laypage-next"
        data-page="2"
        v-show="showEnd"
        :class="{ 'layui-disabled': current === pages.length - 1 }"
        @click.prevent="end"
        ><i class="layui-icon layui-icon-next" v-if="showType === 'icon'"></i>
        <template v-else>尾页</template>
      </a>
    </div>
    <div class="total" v-if="hasTotal">
      到第 <input type="text" class="fluff-input" /> 页 共total 页
    </div>
    <div v-if="hasSelect">
      <div
        class="layui-unselect layui-form-select"
        :class="{ 'layui-form-selected': isSelect }"
        @click="
          () => {
            isSelect = !isSelect
          }
        "
      >
        <div class="layui-select-title">
          <input
            type="text"
            placeholder="请选择"
            readonly
            v-model="options[optIndex]"
            class="layui-input layui-unselect"
          />
          <i class="layui-edge"></i>
        </div>
        <dl class="layui-anim layui-anim-upbit">
          <dd
            v-for="(item, index) in options"
            :key="index"
            :class="{ 'layui-this': index === optIndex }"
            @click="chooseFav(item, index)"
          >
            {{ item }}
          </dd>
        </dl>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, toRefs } from 'vue'
import _ from 'lodash'
interface Props {
  align?: string //显示位置
  showType?: string //显示图片还是文字
  showEnd?: boolean //是否显示尾页
  theme?: string
  hasTotal?: boolean //是否显示到第几页
  hasSelect?: boolean //是否显示一页显示多少条
  total: number //多少条
  current: number //页数
  size: number //一页多少条
}
//3.5写法
const {
  align = 'center',
  showType = 'icon',
  showEnd = false,
  theme = 'layui-bg-green',
  hasTotal = false,
  hasSelect = false,
  total = 0,
  current = 0,
  size = 10,
} = defineProps<Props>()

const state = reactive({
  optIndex: 0,
  options: [10, 20, 30, 50, 100],
  isSelect: false,
  pages: Array<number>(),
  limit: 10,
})
const { optIndex, options, isSelect, pages } = toRefs(state)

const initPages = () => {
  const len = Math.ceil(total / state.limit)
  //5->[1,2,3,4,5]
  state.pages = _.range(1, len + 1)
}

onMounted(() => {
  //设置select的内容
  state.limit = size
  //初始化分页长度
  initPages()
  state.options = _.uniq(_.sortBy(_.concat(state.options, size)))
  state.optIndex = state.options.indexOf(size)
})
//emit
// 顶层声明 emits，返回 emit 函数
const emit = defineEmits<{
  (e: 'changeCurrent', num: number): void
}>()
const chooseFav = (item: number, index: number) => {
  const selected = state.options[index]
  if (selected === undefined) return // 索引无效，直接退出
  //当页面上的limit发送变化之后，调整current数值
  if (state.optIndex !== index) {
    // 保持当前页第一条数据在新分页中的页码
    const startIndex = current * state.limit
    const newCurrent = Math.floor(startIndex / selected)
    emit('changeCurrent', newCurrent)
  }
  if (selected !== undefined) {
    state.optIndex = index
    state.limit = selected
  }
  initPages()
}
const changeIndex = (val: number) => {
  console.log('current值：', val)
  emit('changeCurrent', val)
}
// 首页
const home = () => {
  emit('changeCurrent', 0)
}
//尾页
const end = () => {
  emit('changeCurrent', state.pages.length - 1)
}
//上一页
const prev = () => {
  let cur = 0
  if (current - 1 < 0) {
    cur = 0
  } else {
    cur = current - 1
  }
  emit('changeCurrent', cur)
}
// 下一页
const next = () => {
  let cur = 0
  if (current + 1 >= state.pages.length) {
    cur = state.pages.length - 1
  } else {
    cur = current + 1
  }
  emit('changeCurrent', cur)
}
</script>

<style lang="scss" scoped>
.layui-laypage {
  a {
    margin-left: -1px !important;
    &.active {
      border-radius: 2px;
      position: relative;
      z-index: 100;
    }
  }
}
.layui-bg-green {
  background-color: #009688;
}
.total {
  color: rgba(51, 51, 51, 1);
  margin-left: 20px;
  position: relative;
  top: -2px;
}
.fluff-input {
  width: 30px;
  padding: 0 5px;
  height: 28px;
  line-height: 28px;
}
.layui-input {
  height: 30px;
  line-height: 30px;
}
.layui-form-select {
  width: 80px;
  position: relative;
  top: -2.5px;
  margin-left: 10px;
}
</style>
