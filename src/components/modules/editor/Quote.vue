<template>
  <transition name="fade">
    <div
      class="layui-layer-page layui-layer-prompt edit-content"
      v-show="isShow"
      style="z-index: 1000"
    >
      <div class="layui-layer-title">请输入引用内容</div>
      <div class="layui-layer-content">
        <textarea
          class="layui-layer-input"
          id="quoteInput"
          v-model="quote"
          style="width: 300px; height: 100px"
        ></textarea>
      </div>
      <span class="layui-layer-setwin" @click="cancel()">
        <a class="layui-layer-ico layui-layer-close layui-layer-close1"></a>
      </span>
      <div class="layui-layer-btn">
        <a class="layui-layer-btn0" @click.prevent="submit()">确定</a>
        <a class="layui-layer-btn" @click.prevent="cancel()">取消</a>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import { reactive, toRefs } from 'vue'

import { popup } from '../pop'

interface Props {
  isShow: boolean
}
//3.5写法
const { isShow } = defineProps<Props>()

// 顶层声明 emits，返回 emit 函数
const emit = defineEmits<{
  (e: 'addEven', quote: string): void
  (e: 'closeEvent'): void
}>()
const state = reactive({
  quote: '',
})
const { quote } = toRefs(state)
//确认按钮
const submit = () => {
  if (quote.value === '') {
    document.getElementById('quoteInput')?.focus()
    popup('请输入引用内容', 'shake')
    return
  }
  // 触发事件，把 item 传出去
  emit('addEven', state.quote)
  emit('closeEvent')
  setTimeout(() => {
    // 清空内容
    quote.value = ''
  }, 0)
}

// 关闭取消按钮
const cancel = () => {
  //清空输入内容
  quote.value = ''
  emit('closeEvent')
}
</script>

<style></style>
