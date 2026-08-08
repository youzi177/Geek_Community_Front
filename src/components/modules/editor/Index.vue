<template>
  <div class="edit-wrap">
    <div class="layui-form-item layui-form-text">
      <div class="layui_input-block">
        <div class="layui-unselect fly-edit">
          <!-- 表情 -->
          <span
            @click="
              () => {
                faceStatus = !faceStatus
              }
            "
            ref="face"
          >
            <i class="iconfont icon-yxj-expression"></i>
          </span>
          <!-- 图片 -->
          <span>
            <i class="iconfont icon-tupian"></i>
          </span>
          <!-- 链接 -->
          <span>
            <i class="iconfont icon-lianjie"></i>
          </span>
          <!-- 引用 -->
          <span class="quote"> " </span>
          <!-- 代码 -->
          <span>
            <i class="iconfont icon-emwdaima"></i>
          </span>
          <!-- 水平线 -->
          <span> hr </span>
          <!-- 预览 -->
          <span>
            <i class="iconfont icon-yulan1"></i>
          </span>
        </div>
        <textarea class="layui-textarea fly-editor" name="content"></textarea>
      </div>
    </div>
    <Face
      :is-show="faceStatus"
      @closeEvent="
        () => {
          faceStatus = false
        }
      "
      :ctrl="face"
    ></Face>
  </div>
</template>

<script lang="ts" setup>
import { reactive, toRefs } from 'vue'
import Face from './Face.vue'

const state = reactive({
  faceStatus: false,
  face: <HTMLElement | null>null,
})
const { faceStatus, face } = toRefs(state)
</script>

<style lang="scss">
@keyframes bounceIn {
  0% {
    opacity: 0;
    transform: scale(0.5);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
@keyframes bounceOut {
  0% {
    transform: scale(1);
  }
  30% {
    transform: scale(1.05);
  }
  100% {
    opacity: 0;
    transform: scale(0.7);
  }
}
/* 进入动画 */
.fade-enter-active {
  animation: bounceIn 0.3s;
}
/* 离开动画 */
.fade-leave-active {
  animation: bounceOut 0.3s;
}

.fly-editor {
  height: 200px;
}
.quote {
  font-size: 22px;
  vertical-align: middle;
  position: relative;
  top: 4px;
}
.edit-wrap {
  position: relative;
}
</style>
