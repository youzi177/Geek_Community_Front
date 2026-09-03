import type { Directive, DirectiveBinding } from 'vue'
import { escapeHtml } from './escapeHtml'
import { useUserStore } from '@/stores'
import router from '@/router' // 根据实际路径调整
// 评论内容转义
const richtext: Directive<HTMLElement, string> = {
  // 对应 Vue2 的 bind：首次绑定、挂载前初始化
  beforeMount(el: HTMLElement, binding: DirectiveBinding<string>) {
    el.innerHTML = escapeHtml(binding.value)
  },
  // 对应 Vue2 的 componentUpdated：组件更新后同步
  updated(el: HTMLElement, binding: DirectiveBinding<string>) {
    el.innerHTML = escapeHtml(binding.value)
  },
}
// 角色权限控制
const hasRole: Directive<HTMLElement, string> = {
  // Vue 2 的 inserted → Vue 3 的 mounted
  mounted(el: HTMLElement, binding: DirectiveBinding<string>) {
    const UserStore = useUserStore()
    const roles: string[] = UserStore.userInfo.roles || ['user']
    if (!roles.includes(binding.value)) {
      // 使用可选链，避免 parentNode 为 null 时报错
      el.parentNode?.removeChild(el)
    }
  },
  // 如需在组件更新时也进行权限检查，可添加 updated 钩子（逻辑相同）
  // updated(el: HTMLElement, binding: DirectiveBinding<string>) {
  //   const roles: string[] = store.state.userInfo.roles || ['user']
  //   if (!roles.includes(binding.value)) {
  //     el.parentNode?.removeChild(el)
  //   }
  // }
}

// 权限指令：要求当前路由 meta.types 中包含指令值数组中所有的权限类型
const hasPermission: Directive<HTMLElement, string[]> = {
  // Vue2 的 inserted → Vue3 的 mounted
  mounted(el: HTMLElement, binding: DirectiveBinding<string[]>) {
    console.log('🚀 ~ binding:', binding)
    console.log('🚀 ~ el:', el)
    const types: string[] = (router.currentRoute.value.meta?.types as string[]) || []
    console.log('🚀 ~ types:', types)
    // 指令绑定的值，应为字符串数组
    const values: string[] = binding.value || []

    // 检查是否所有要求的权限都存在于 types 中
    const hasAllPermissions = values.every((v) => types.includes(v))
    console.log('🚀 ~ hasAllPermissions:', hasAllPermissions)

    if (!hasAllPermissions) {
      // 缺少权限，移除元素（使用可选链避免 parentNode 为 null）
      el.parentNode?.removeChild(el)
    }
  },
  // 如需在组件更新时重新检查权限，可添加 updated 钩子（逻辑相同）
  // updated(el, binding) {
  //   // 同上逻辑
  // }
}
export default {
  richtext,
  hasRole,
  hasPermission,
} as Record<string, Directive>
