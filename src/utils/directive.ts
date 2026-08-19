import type { Directive, DirectiveBinding } from 'vue'
import { escapeHtml } from './escapeHtml'

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
export default {
  richtext,
} as Record<string, Directive>
