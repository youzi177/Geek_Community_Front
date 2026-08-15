<template>
  <Transition name="fade">
    <div class="layui-layer layui-layer-page layui-layer-prompt edit-content" v-show="isShow">
      <div class="layui-layer-title">请输入合法链接</div>
      <div class="layui-layer-content">
        <input type="text" class="layui-layer-input" v-model="link" id="linkInput" />
      </div>
      <!-- 关闭按钮 -->
      <span class="layui-layer-setwin" @click="cancel">
        <a
          href="Javascript:void(0)"
          class="layui-layer-ico layui-layer-close layui-layer-close1"
        ></a>
      </span>
      <div class="layui-layer-btn">
        <a href="Javascript:void(0)" class="layui-layer-btn0" @click="submit">确定</a>
        <a href="Javascript:void(0)" class="layui-layer-btn" @click="cancel">取消</a>
      </div>
    </div>
  </Transition>
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
  (e: 'addEven', link: string): void
  (e: 'closeEvent'): void
}>()
const state = reactive({
  link: '',
})
const { link } = toRefs(state)

//确认按钮
const submit = () => {
  if (link.value === '') {
    document.getElementById('linkInput')?.focus()
    popup('请输入合法链接', 'shake')
    return
  }
  // 触发事件，把 item 传出去
  emit('addEven', state.link)
  emit('closeEvent')
  setTimeout(() => {
    // 清空内容
    link.value = ''
  }, 0)
}

// 关闭取消按钮
const cancel = () => {
  //清空输入内容
  link.value = ''
  emit('closeEvent')
}
</script>

<style></style>
