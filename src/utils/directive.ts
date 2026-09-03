import type { Directive, DirectiveBinding } from 'vue'
import { escapeHtml } from './escapeHtml'
import { useUserStore } from '@/stores'

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
export default {
  richtext,
  hasRole,
} as Record<string, Directive>
