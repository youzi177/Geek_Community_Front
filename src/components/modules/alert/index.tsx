import { createApp } from 'vue'
import AlertComponent from './Alert.vue'
//导出myalert函数
export const myalert = (msg: string) => {
  //创建和挂载节点
  const root = document.createElement('div')
  document.body.append(root)
  //配置
  const options = {
    type: 'alert',
    msg: msg,
  }
  //动态创建vue组件
  const alertCom = createApp({
    setup() {
      //组件销毁
      const unmount = () => {
        alertCom.unmount()
        document.body.removeChild(root)
      }
      const newOptions = Object.assign(options, { unmount })
      return () => <AlertComponent {...newOptions} />
    },
  })
  alertCom.mount(root)
}
export const myconfirm = (msg: string, successEvent: () => void, cancelEvent: () => void) => {
  const root = document.createElement('div')
  document.body.append(root)
  const options = {
    type: 'confirm',
    msg,
    successEvent,
    cancelEvent,
  }
  const alertCom = createApp({
    setup() {
      const unmount = () => {
        alertCom.unmount()
        document.body.removeChild(root)
      }
      const newOptions = Object.assign(options, { unmount })
      return () => <AlertComponent {...newOptions} />
    },
  })
  alertCom.mount(root)
}
