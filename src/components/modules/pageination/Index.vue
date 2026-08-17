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
        href="javascript:;"
        class="layui-laypage-prev layui-disabled"
        data-page="0"
        v-show="showEnd"
        ><i class="layui-icon layui-icon-prev" v-if="showType === 'icon'"></i>
        <template v-else>首页</template>
      </a>
      <!-- left上一页 -->
      <a href="javascript:;" data-page="2"
        ><i class="layui-icon layui-icon-left" v-if="showType === 'icon'"></i>
        <template v-else>上一页</template>
      </a>
      <a href="javascript:;" data-page="1" :class="[true ? theme : '', true ? 'active' : '']">1</a>
      <a href="javascript:;" data-page="2">2</a>
      <a href="javascript:;" data-page="3">3</a>
      <a href="javascript:;" data-page="4">4</a>
      <a href="javascript:;" data-page="5">5</a>
      <!-- right下一页 -->
      <a href="javascript:;" data-page="5">
        <i class="layui-icon layui-icon-right" v-if="showType === 'icon'"></i>
        <template v-else>下一页</template>
      </a>
      <!-- next尾页 -->
      <a href="javascript:;" class="layui-laypage-next" data-page="2" v-show="showEnd"
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
import { reactive, toRefs } from 'vue'

interface Props {
  align?: string //显示位置
  showType?: string //显示图片还是文字
  showEnd?: boolean //是否显示尾页
  theme?: string
  hasTotal?: boolean //是否显示到第几页
  hasSelect?: boolean //是否显示一页显示多少条
}
//3.5写法
const {
  align = 'center',
  showType = 'icon',
  showEnd = false,
  theme = 'layui-bg-green',
  hasTotal = false,
  hasSelect = false,
} = defineProps<Props>()

const state = reactive({
  optIndex: 0,
  options: [10, 20, 30, 40, 50],
  isSelect: false,
})
const { optIndex, options, isSelect } = toRefs(state)
const chooseFav = (item: number, index: number) => {
  state.optIndex = index
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
