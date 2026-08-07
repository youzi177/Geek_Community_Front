<template>
  <!-- 上传头像 -->
  <div class="layui-form layui-form-pane layui-tab-item layui-show">
    <div class="layui-form-item">
      <div class="avatar-add">
        <p>建议尺寸168*168，支持jpg、png、gif，最大不能超过50KB</p>
        <label for="pic" class="layui-btn upload-img">
          <i class="layui-icon">&#xe67c;</i>上传头像
          <input
            type="file"
            name="file"
            ref="picInput"
            id="pic"
            accept="image/png,image/jpeg,image/gif"
            @change="update"
          />
        </label>
        <img :src="pic" />
        <span class="loading"></span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { uploadImg } from '@/api/content'
import { updateUserInfo } from '@/api/user'
import type { HttpResponse } from '@/common/interface'
import { myalert } from '@/components/modules/alert'
import { useUserStore } from '@/stores'
import { ref } from 'vue'
import config from '@/config/index'
const UserStore = useUserStore()
const pic = ref(UserStore.userInfo.pic ? UserStore.userInfo.pic : '/img/default.png')
const picInput = ref<HTMLInputElement | null>(null)
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
      //上传成功之后应该更新用户基本信息
      const resuesr = await updateUserInfo({ pic: pic.value })
      const { code, msg } = resuesr as HttpResponse
      if (code === 200) {
        UserStore.setUserInfo({ pic: pic.value })
        myalert(msg as string)
        // 把上传头像的值为空，否则用户再次点击上传头像就监听不到
        const input = picInput.value
        if (!input) return
        input.value = '' // 完美，无 TS 报错
      }
    } else {
      //上传图片失败
      myalert('图片上传失败')
    }
  }
}
</script>

<style lang="scss" scoped>
#pic {
  display: none;
}
</style>
