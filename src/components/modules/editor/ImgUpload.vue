<template>
  <Transition name="fade">
    <div class="layui-layer layui-layer-page layui-edit-border edit-content" v-show="isShow">
      <div class="layui-layer-title">插入图片</div>
      <div class="layui-layer-content">
        <ul class="layui-form layui-form-pane">
          <li class="layui-form-item">
            <label class="layui-form-label">URL</label>
            <div class="layui-input-inline">
              <input
                type="text"
                id="fileInput"
                class="layui-input"
                placeholder="粘贴图片地址或者点击上传"
                v-model="pic"
              />
            </div>
            <button type="button" class="layui-btn layui-btn-primary">
              <label for="udloadImg"><i class="layui-icon layui-icon-upload">上传图片</i></label>
              <input
                type="file"
                name="file"
                id="udloadImg"
                class="layui-upload-file"
                @change="update"
              />
            </button>
          </li>
          <li class="layui-form-item">
            <button type="button" class="layui-btn" @click="submit">确认</button>
          </li>
        </ul>
      </div>
      <!-- 关闭按钮 -->
      <span class="layui-layer-setwin" @click.stop="close">
        <a
          href="Javascript:void(0)"
          class="layui-layer-ico layui-layer-close layui-layer-close1"
        ></a>
      </span>
    </div>
  </Transition>
</template>

<script lang="ts" setup>
import { reactive, toRefs } from 'vue'
import { myalert } from '../alert'
import { uploadImg } from '@/api/content'
import type { HttpResponse } from '@/common/interface'
import config from '@/config'

import { popup } from '../pop'

interface Props {
  isShow: boolean
}
//3.5写法
const { isShow } = defineProps<Props>()

// 顶层声明 emits，返回 emit 函数
const emit = defineEmits<{
  (e: 'addEven', pic: string): void
  (e: 'closeEvent'): void
}>()
const state = reactive({
  pic: '',
})
const { pic } = toRefs(state)

//确认按钮
const submit = () => {
  if (pic.value === '') {
    document.getElementById('fileInput')?.focus()
    popup('请上传图片或者手动输入链接', 'shake')
    return
  }
  // 触发事件，把 item 传出去
  emit('addEven', state.pic)
  emit('closeEvent')
  setTimeout(() => {
    // 清空内容
    pic.value = ''
  }, 0)
}

// 关闭按钮
const close = () => {
  //清空输入内容或者选择的文件
  pic.value = ''
  emit('closeEvent')
}
// 上传图片
const update = async (e: Event) => {
  //console.log('🚀 ~ update ~ e:', e)
  const input = e.target as HTMLInputElement
  //用户可能存在取消的情况
  const file = input.files?.[0]
  if (!file) {
    return
  }
  // ✅ 在构建 FormData 之前检查文件大小
  if (file.size > 2 * 1024 * 1024) {
    myalert('文件不能超过2MB')
    return
  }
  const fd = new FormData()
  if (input.files && input.files.length > 0) {
    fd.append('file', file)
    const resimg = await uploadImg(fd)
    const { code, data } = resimg as HttpResponse
    if (code === 200) {
      //上传之后成功之后把url赋值给pic
      const baseUrl =
        import.meta.env.MODE === 'development' ? config.basurl.dev : config.basurl.prop
      pic.value = baseUrl + data
    } else {
      //上传图片失败
      myalert('图片上传失败')
    }
  }
}
</script>

<style scoped>
.layui-form-item {
  text-align: center;
}
.layui-form-pane {
  margin: 20px;
}
</style>
