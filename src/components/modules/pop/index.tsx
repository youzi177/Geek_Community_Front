import PopComponent from './Pop.vue'
import { createApp } from 'vue'

export const popup = (msg: string, type = '', delay = 2000) => {
  // 注册Pop组件
  const root = document.createElement('div')
  document.body.appendChild(root)

  // 添加实例方法，以供全局进行调用
  const options = {
    msg,
    type,
    delay,
  }

  const popCom = createApp({
    setup() {
      const unmount = () => {
        popCom.unmount()
        document.body.removeChild(root)
      }
      const newOptions = Object.assign(options, { unmount })
      return () => <PopComponent {...newOptions} />
    },
  })

  popCom.mount(root)
}
// 把 popup 方法挂载到 Vue 全局实例上，让所有组件都可以通过 this.$pop() 调用。
// export default {
//   install: (app: App) => {
//     app.config.globalProperties.$pop = popup
//   },
// }

//setup使用方式：
// mian.ts
// import Popup from './plugin'
// app.use(Popup)

//组件使用
// import { getCurrentInstance } from 'vue'
// const instance = getCurrentInstance()
// instance?.proxy?.$pop('操作成功')
