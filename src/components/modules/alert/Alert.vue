<template>
  <div>
    <div class="alert">
      <div class="flex">{{ msg }}</div>
      <div v-if="type === 'alert'">
        <div class="btnCommon succes" @click="close">确定</div>
      </div>
      <div class="space-round" v-else>
        <div class="btnCommon cancel" @click="cancel">取消</div>
        <div class="btnCommon succes" @click="success">确定</div>
      </div>
    </div>
    <div class="mask" @click="closeMask"></div>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  msg: string //显示内容
  unmount: Function //删除dom
  type: string //alert还是其他
  cancelEvent?: Function //取消事件
  successEvent?: Function //确定事件
}
//3.5写法
const { msg = '', unmount, type = 'alert', cancelEvent, successEvent } = defineProps<Props>()
const close = () => {
  unmount()
}
//点击遮罩销毁组件
const closeMask = () => {
  //如果是alert才能点击遮罩关闭弹窗，否则的话不能
  if (type === 'alert') {
    unmount()
  }
}
//点击取消，执行回调事件，并且销毁组件
const cancel = () => {
  cancelEvent?.()
  unmount()
}
//点击确定，执行回调事件，并且销毁组件
const success = () => {
  successEvent?.()
  unmount()
}
</script>

<style lang="scss" scoped>
@use 'sass:color';
$btn-main: #009688;
// $btn-dark: darken($btn-main, 5%);
$btn-dark: color.adjust($btn-main, $lightness: -5%);
.alert {
  width: 300px;
  height: 150px;
  position: fixed;
  background: #fff;
  border-radius: 6px;
  left: 50%;
  top: 50%;
  margin-left: -150px;
  margin-top: -75px;
  padding: 20px 10px;
  box-shadow: 0 5px 8px rgba(0, 0, 0, 0.05);
  z-index: 3000;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
}
.flex {
  flex: 1;
  justify-content: center;
  align-items: center;
  display: flex;
}
.space-round {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  padding: 0 10px;
}
.btnCommon {
  width: 105px;
  height: 32px;
  text-align: center;
  line-height: 32px;
  border-radius: 6px;
  &.succes {
    background-color: $btn-main;
    color: #fff;
  }
  &:hover {
    background-color: $btn-dark;
  }
  &.cancel {
    background: #ededed;
    color: #333;
  }
}
.mask {
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.05);
  left: 0;
  top: 0;
  overflow: hidden;
  z-index: 2000;
}
</style>
