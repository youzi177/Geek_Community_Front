<template>
  <div class="tips animation" :class="{ shake: type === 'shake' }" ref="tips">
    <div class="content">
      {{ msg }}
    </div>
  </div>
</template>

<script lang="ts" setup>
// Vue3 Composition API
import { ref, onMounted } from 'vue'

/**
 * 接收父级动态创建组件时传入的参数
 */
const props = defineProps({
  // 动画类型
  type: {
    type: String,
    default: '',
  },

  // 显示内容
  msg: {
    type: String,
    default: '',
  },

  // 自动关闭时间
  delay: {
    type: Number,
    default: 2000,
  },

  // 外部传入的销毁方法
  unmount: {
    type: Function,
    default: () => {},
  },
})

// 获取 DOM 节点
const tips = ref<HTMLElement | null>(null)

/**
 * 组件挂载完成后执行
 */
onMounted(() => {
  const el = tips.value

  if (el) {
    // 获取自身宽高
    const height = el.clientHeight
    const width = el.clientWidth

    // 因为 left:50% top:50%
    // 需要根据自身尺寸反向偏移实现真正居中
    el.style.marginLeft = `${-width / 2}px`
    el.style.marginTop = `${-height / 2}px`
  }

  // 延迟销毁组件
  setTimeout(() => {
    props.unmount()
  }, props.delay)
})
</script>

<style lang="scss" scoped>
@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }

  10%,
  30%,
  50%,
  70%,
  90% {
    transform: translateX(-10px);
  }

  20%,
  40%,
  60%,
  80% {
    transform: translateX(10px);
  }
}

.tips {
  position: fixed;
  left: 50%;
  top: 50%;
  z-index: 2000;
}

.animation {
  animation-fill-mode: both;
  animation-duration: 0.3s;
}

.content {
  background: rgba(0, 0, 0, 0.4);
  color: #fff;

  padding: 10px 15px;

  border-radius: 6px;
}

.shake {
  animation-name: shake;
}
</style>
