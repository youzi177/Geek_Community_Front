<template>
  <div
    :class="{
      'text-center': align === 'center',
      'text-left': align === 'left',
      'text-right': align === 'right',
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
  </div>
</template>

<script lang="ts" setup>
interface Props {
  align: string //显示位置
  showType: string //显示图片还是文字
  showEnd: boolean //是否显示尾页
  theme: string
}
//3.5写法
const {
  align = 'center',
  showType = 'text',
  showEnd = true,
  theme = 'layui-bg-green',
} = defineProps<Props>()
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
</style>
