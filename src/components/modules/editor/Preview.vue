<template>
  <transition name="fade">
    <div class="layui-layer-page layui-layer-prompt edit-content" v-show="isShow" id="preview">
      <div class="layui-layer-title">预览</div>
      <div class="layui-layer-content">
        <div class="detail-body" v-html="replaceContent"></div>
      </div>
      <span class="layui-layer-setwin" @click="cancel()">
        <a class="layui-layer-ico layui-layer-close layui-layer-close1"></a>
      </span>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import { escapeHtml } from '@/utils/escapeHtml'
import { computed, watch } from 'vue'
import { useAppStore } from '@/stores'
const appStore = useAppStore()
interface Props {
  isShow: boolean
  content: string
}
//3.5写法
const { isShow, content } = defineProps<Props>()
const replaceContent = computed(() => {
  if (typeof content === 'undefined' || content.trim() === '') {
    return ''
  }
  return escapeHtml(content)
})
// 顶层声明 emits，返回 emit 函数
const emit = defineEmits<{
  (e: 'closeEvent'): void
}>()
// 关闭取消按钮
const cancel = () => {
  emit('closeEvent')
}
//解决预览时候偶尔双滚动条的问题
watch(
  () => isShow,
  (newval) => {
    // console.log('🚀 ~ oldval:', oldval)
    console.log('🚀 ~ newval:', newval)
    if (newval) {
      appStore.setHide(true)
    } else {
      appStore.setHide(false)
    }
  },
)
</script>

<style scoped>
#preview {
  position: fixed;
  width: 100%;
  height: 100%;
  background: #fff;
  top: 0;
  left: 0;
  z-index: 10000;
  overflow-y: auto;
}
.detail-body {
  max-width: 1000px;
  margin: 0 auto;
}
</style>
