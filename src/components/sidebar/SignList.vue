<template>
  <!-- 签到组件-签到排行弹出框 -->
  <div class="modal" v-show="isShow">
    <div class="mask" @click="close"></div>
    <div class="layui-layer layui-layer-page" :class="{ active: isShow }">
      <div class="layui-layer-title">
        签到活跃榜-TOP20<i class="layui-icon layui-icon-close pull-right" @click="close"></i>
      </div>
      <div class="layui-layer-content pd0">
        <div class="layui-tab layui-tab-brief">
          <ul class="layui-tab-title">
            <li :class="{ 'layui-this': current === 0 }" @click="choose(0)">最新签到</li>
            <li :class="{ 'layui-this': current === 1 }" @click="choose(1)">今日最快</li>
            <li :class="{ 'layui-this': current === 2 }" @click="choose(2)">总签到榜</li>
          </ul>
          <div class="layui-tab-content">
            <ul class="layui-tab-item layui-show">
              <li v-for="(item, index) in lists" :key="index">
                <img src="../../assets/images/avatar/11.jpg" alt="" class="mr1" />
                <cite class="fly-link">{{ item.name }}</cite>
                <span class="fly-grey" v-if="current !== 2">签到于{{ item.created }}</span>
                <span class="fly-grey" v-else
                  >已经连续签到<i class="orange">{{ item.count }}</i
                  >天</span
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

interface Props {
  isShow: boolean
  lists: { name: string; count: number; created: string }[]
}
//3.5写法
const { isShow = false, lists } = defineProps<Props>()
const current = ref(0) //状态量
//签到榜单切换
const choose = (val: number) => {
  current.value = val
  //请求后台数据
}
//emit一个closeModal事件
const emit = defineEmits(['closeModal'])
const close = () => {
  //关闭时重置current
  current.value = 0
  emit('closeModal')
}
</script>

<style scoped></style>
