<template>
  <Transition name="fade">
    <div class="layui-layer-tips layui-edit-face edit-content layui-layer-prompt" v-show="isShow">
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

import { ref } from 'vue'
const lists = ref(faces)
interface Props {
  isShow: boolean
}
//3.5写法
const { isShow } = defineProps<Props>()

// 顶层声明 emits，返回 emit 函数
const emit = defineEmits<{
  (e: 'addEven', item: string): void
  (e: 'closeEvent'): void
}>()
const handleFaceClick = (item: string) => {
  // 触发事件，把 item 传出去
  emit('addEven', item)
  emit('closeEvent')
}
</script>

<style></style>
