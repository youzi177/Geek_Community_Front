<template>
  <Transition name="fade">
    <div class="layui-layer layui-layer-tips layui-edit-face edit-content" v-show="isShow">
      <div class="layui-layer-content">
        <ul class="layui-clear">
          <li v-for="(item, index) in lists" :key="index" @click="handleFaceClick(index)">
            <img :src="item" alt="" />
          </li>
        </ul>
      </div>
    </div>
  </Transition>
</template>

<script lang="ts" setup>
import faces from '@/assets/js/face'
import { nextTick, onBeforeUnmount } from 'vue'
import { onMounted, ref } from 'vue'
const lists = ref(faces)
interface Props {
  isShow: boolean
  ctrl: HTMLElement | null
}
//3.5写法
const { isShow, ctrl } = defineProps<Props>()

// 顶层声明 emits，返回 emit 函数
const emit = defineEmits<{
  (e: 'addFaceEven', item: string): void
  (e: 'closeEvent'): void
}>()
const handleFaceClick = (item: string) => {
  // 触发事件，把 item 传出去
  emit('addFaceEven', item)
}
// 用一个变量保存事件处理函数，方便移除监听
const handleBodyClick = (e: MouseEvent) => {
  if (!ctrl?.contains(e.target as Node)) {
    emit('closeEvent')
  }
}
onMounted(() => {
  nextTick(() => {
    document.querySelector('body')?.addEventListener('click', handleBodyClick)
  })
})
// 组件卸载时移除监听，避免内存泄漏
onBeforeUnmount(() => {
  document.querySelector('body')?.removeEventListener('click', handleBodyClick)
})
</script>

<style>
.edit-content {
  position: absolute;
  top: 45px;
  left: 0;
}
</style>
