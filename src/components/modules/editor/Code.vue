<template>
  <transition name="fade">
    <div
      class="layui-layer-page layui-layer-prompt edit-content"
      v-show="isShow"
      style="z-index: 1000"
    >
      <div class="layui-layer-title">请贴入代码或任意文本</div>
      <div class="layui-layer-content">
        <textarea
          class="layui-layer-input"
          id="codeInput"
          v-model="code"
          :style="{ width: width + 'px', height: height + 'px' }"
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
  width: number
  height: number
}
//3.5写法
const { isShow, width, height } = defineProps<Props>()

// 顶层声明 emits，返回 emit 函数
const emit = defineEmits<{
  (e: 'addEven', code: string): void
  (e: 'closeEvent'): void
}>()
const state = reactive({
  code: '',
})
const { code } = toRefs(state)
//确认按钮
const submit = () => {
  if (code.value === '') {
    document.getElementById('codeInput')?.focus()
    popup('请贴入代码或任意文本', 'shake')
    return
  }
  // 触发事件，把 item 传出去
  emit('addEven', state.code)
  emit('closeEvent')
  setTimeout(() => {
    // 清空内容
    code.value = ''
  }, 0)
}

// 关闭取消按钮
const cancel = () => {
  //清空输入内容
  code.value = ''
  emit('closeEvent')
}
</script>

<style></style>
