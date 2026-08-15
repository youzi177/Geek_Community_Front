// 导入表情映射模块
// 若 @/assets/js/face 没有类型声明文件，可在上一行添加 // @ts-ignore 忽略类型检查
import faces from '@/assets/js/face'

/**
 * HTML 编码函数
 * @param html 需要编码的字符串
 * @returns 编码后的 HTML 字符串
 */
const htmlEncode = (html: string): string => {
  const temp = document.createElement('div')
  // 原三元表达式改为 if/else，逻辑更清晰
  if (temp.textContent !== undefined) {
    temp.textContent = html
  } else {
    temp.innerText = html
  }
  const output = temp.innerHTML
  return output
}

/**
 * 转义富文本内容，将自定义标记转换为 HTML
 * @param val 原始字符串
 * @returns 转换后的 HTML 字符串
 */
const escapeHtml = (val: string = ''): string => {
  if (!val) return ''

  let result = val

  // ========== 表情替换 ==========
  const face = /\sface\[\W{1,}]/g
  // 原代码使用 face.test 后再次 match，存在 lastIndex 状态问题；
  // 改为直接 match 并判断结果是否存在，避免重复匹配导致的问题
  const faceGroup = result.match(face)
  if (faceGroup) {
    // 原代码使用 map 但不使用返回值，改用 forEach 更符合语义
    faceGroup.forEach((item) => {
      const keyMatch = item.match(/\[\S+\]/g)
      const key = keyMatch && keyMatch.length > 0 ? keyMatch[0] : ''
      // faces 对象取值可能为 undefined，使用类型断言并提供默认空字符串
      result = result.replace(
        item,
        `<img src="${(faces as Record<string, string>)[key] ?? ''}" style="height: 22px">`,
      )
    })
  }

  // ========== 图片替换 ==========
  const img = /img\[\S+\]/g
  const imgGroup = result.match(img)
  if (imgGroup) {
    imgGroup.forEach((item) => {
      result = result.replace(
        item,
        `<div class = "himg"><img src="${item.substr(4, item.length - 5)}"></div>`,
      )
    })
  }

  // ========== 链接替换 a(链接)[标题] ==========
  const link = /\sa\(\S+\]/g
  const linkGroup = result.match(link)
  if (linkGroup) {
    const title = /\((.+)\)/
    const linkName = /\[(.+)\]/
    linkGroup.forEach((item) => {
      const nameMatch = item.match(linkName)
      // 原代码未处理 match 返回 null 的情况，这里添加判断，避免运行时错误
      const name = nameMatch && nameMatch.length > 0 ? nameMatch[1] : ''

      const linkMatch = item.match(title)
      const linkUrl = linkMatch && linkMatch.length > 0 ? linkMatch[1] : ''

      result = result.replace(item, `<a href="${linkUrl}">${name}</a>`)
    })
  }

  // ========== 引用替换 ==========
  result = result.replace(/\[quote\]/g, '<div class="layui-elem-quote">')
  result = result.replace(/\[\/quote\]/g, '</div>')

  // ========== 代码块替换 ==========
  const code = /(\[\/?pre(.+?)[^\]]*\])|\[[^\]]*\]/g
  const codeGroup = result.match(code)
  if (codeGroup) {
    // 同上，使用 forEach 替代 map
    codeGroup.forEach((item) => {
      result = result.replace(item, htmlEncode(item))
    })
    result = result.replace(/\[pre\]/g, '<pre>')
    result = result.replace(/\[\/pre\]/g, '</pre>')
  }

  // ========== 水平线替换 ==========
  result = result.replace(/\[hr\]/g, '<hr>')

  // ========== 换行替换 ==========
  result = result.replace(/\r\n/g, '<br>')
  result = result.replace(/\n/g, '<br>')

  return result
}

export { escapeHtml }
