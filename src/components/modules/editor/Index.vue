<template>
  <div class="edit-wrap">
    <div class="layui-form-item layui-form-text">
      <div class="layui_input-block">
        <div class="layui-unselect fly-edit" ref="icons">
          <!-- 表情 -->
          <span @click="choose(0)">
            <i class="iconfont icon-yxj-expression"></i>
          </span>
          <!-- 图片 -->
          <span>
            <i class="iconfont icon-tupian" @click="choose(1)"></i>
          </span>
          <!-- 链接 -->
          <span>
            <i class="iconfont icon-lianjie" @click="choose(2)"></i>
          </span>
          <!-- 引用 -->
          <span class="quote" @click="choose(3)"> " </span>
          <!-- 代码 -->
          <span>
            <i class="iconfont icon-emwdaima" @click="choose(4)"></i>
          </span>
          <!-- 水平线 -->
          <span @click="addHr"> hr </span>
          <!-- 预览 -->
          <span @click="choose(6)">
            <i class="iconfont icon-yulan1"></i>
          </span>
        </div>
        <textarea
          class="layui-textarea fly-editor"
          name="content"
          ref="textEdit"
          v-model="content"
          @focus="focusEvent()"
          @blur="blurEvent()"
        ></textarea>
      </div>
    </div>
    <div ref="modal">
      <Face :isShow="current === 0" @closeEvent="closeModal" @add-even="addFace"></Face>
      <ImgUpload :isShow="current === 1" @closeEvent="closeModal" @add-even="addImg"></ImgUpload>
      <LinkAdd :isShow="current === 2" @closeEvent="closeModal" @add-even="addLink"></LinkAdd>
      <Quote :isShow="current === 3" @closeEvent="closeModal" @add-even="addQuote"></Quote>
      <Code
        :isShow="current === 4"
        @closeEvent="closeModal"
        :width="codeWidth"
        :height="codeHeight"
        @add-even="addCode"
      ></Code>
      <Preview :isShow="current === 6" :content="content" @closeEvent="closeModal()"></Preview>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { nextTick, onBeforeUnmount, onMounted, reactive, ref, toRefs } from 'vue'
import Face from './Face.vue'
import ImgUpload from './ImgUpload.vue'
import LinkAdd from './LinkAdd.vue'
import Quote from './Quote.vue'
import Code from './Code.vue'
import Preview from './Preview.vue'
// 编辑器面板的状态管理
const state = reactive({
  current: -1,
  icons: <HTMLElement | null>null, // 整个图标栏的 DOM 引用（用于判断点击是否在图标上）
  modal: <HTMLElement | null>null, // 所有弹窗容器的 DOM 引用（用于判断点击是否在弹窗内）
  codeWidth: 400,
  codeHeight: 200,
  content: '', //内容
  pos: 0, //光标位置
})
const textEdit = ref<HTMLTextAreaElement | null>(null)

const { icons, modal, current, codeWidth, codeHeight, content } = toRefs(state)
// 点击页面任意位置时的处理函数
const handleBodyClick = (e: MouseEvent) => {
  // 判断点击位置是否在图标栏或弹窗容器内
  const isClickInside =
    icons.value?.contains(e.target as Node) || modal.value?.contains(e.target as Node)
  if (!isClickInside) {
    // 如果点击在外部，关闭所有弹窗
    closeModal()
  }
}
// 页面变化，代码输入框也变化，
const handleResize = () => {
  if (textEdit.value) {
    state.codeWidth = textEdit.value.offsetWidth - 60
    state.codeHeight = textEdit.value.offsetHeight - 80
  }
}
/**
 * 切换编辑面板的显示/隐藏
 * @param {number} index - 面板对应的索引
 *  0: 表情面板
 *  1: 图片上传面板
 *  2: 链接添加面板
 *  3: 引用面板
 *  4: 代码面板
 *  ……
 */
const choose = (index: number) => {
  // 如果点击的是当前已打开的面板，则关闭它
  if (current.value === index) {
    current.value = -1
  } else {
    // 否则打开对应面板，同时关闭其他面板（因为只有一个面板可以打开）
    current.value = index
  }
}
// 关闭所有面板
const closeModal = () => {
  current.value = -1
}
// 组件挂载后，在 body 上添加全局点击监听
onMounted(() => {
  nextTick(() => {
    document.querySelector('body')?.addEventListener('click', handleBodyClick)
  })
  handleResize()
  window.addEventListener('resize', handleResize)
})
// 组件卸载时移除监听，避免内存泄漏
onBeforeUnmount(() => {
  document.querySelector('body')?.removeEventListener('click', handleBodyClick)
  window.removeEventListener('resize', handleResize)
})
//添加表情
const addFace = (item: string) => {
  const insertContent = ` face${item}`
  insert(insertContent)
  state.pos += insertContent.length
}
//添加图片
const addImg = (item: string) => {
  const insertContent = ` img[${item}]`
  insert(insertContent)
  state.pos += insertContent.length
}
//添加链接
const addLink = (item: string) => {
  const insertContent = ` a(${item})[${item}]`
  insert(insertContent)
  state.pos += insertContent.length
}
//添加代码
const addCode = (item: string) => {
  const insertContent = ` \n[pre]\n${item}\n[/pre]`
  insert(insertContent)
  state.pos += insertContent.length
}
//添加引用
const addQuote = (item: string) => {
  const insertContent = `\n[quote]\n${item}\n[/quote]`
  insert(insertContent)
  state.pos += insertContent.length
}
//添加hr
const addHr = () => {
  insert('\n[hr]')
  state.pos += 5
}
//光标插入位置
const insert = (val: string) => {
  if (typeof state.content === 'undefined') {
    return
  }
  const tmp = state.content.split('')
  tmp.splice(state.pos, 0, val)
  state.content = tmp.join('')
}
// 计算光标的当前位置
const getPos = () => {
  let cursorPos = 0
  const elem = textEdit.value
  if (elem) {
    // 现代浏览器都支持 selectionStart，但保留对 0 的判断
    cursorPos = elem.selectionStart ?? 0
  }
  state.pos = cursorPos
}
const focusEvent = () => {
  getPos()
}
const blurEvent = () => {
  getPos()
}
</script>

<style lang="scss">
.edit-content {
  position: absolute;
  top: 45px;
  left: 0;
}
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
.edit-content {
  position: absolute;
  top: 45px;
  left: 0;
  z-index: 100;
  background: #fff;
}
.icon-emwdaima {
  position: relative;
  top: 2px;
}
.layui-layer-prompt {
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
}
</style>
