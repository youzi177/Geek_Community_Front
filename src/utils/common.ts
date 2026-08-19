// 取Url的key值
// const getParam = (name: string, url: string) => {
//   if (!url) url = location.href
//   name = name.replace(/[\\[]/, '\\\\[').replace(/[\]]/, '\\\\]')
//   const regexS = '[\\?&]' + name + '=([^&#]*)'
//   const regex = new RegExp(regexS)
//   const results = regex.exec(url)
//   return results == null ? null : results[1]
// }
// 取Url的key值
const getParam = (name: string, url = window.location.href) => {
  return new URL(url).searchParams.get(name)
}
// 编辑评论滚动距离
const getElementY = (elem: string): number => {
  const el = document.querySelector<HTMLElement>(elem)
  if (!el) {
    throw new Error(`未找到元素：${elem}`)
  }

  return window.scrollY + el.getBoundingClientRect().top
}
/**
 * 滚动到指定的元素
 * @param elem DOM元素选择器
 * @param duration 滚动动画执行的时间
 * @param offset 滚动偏移量
 */
const scrollToElem = (elem: string, duration: number, offset: number = 0): void => {
  const startingY: number = window.scrollY //初始位置
  const elementY: number = getElementY(elem)
  // 需要去滚动的距离
  const diff: number = elementY - startingY + offset
  // 如果 diff 0
  if (diff === 0) return

  const easing = (t: number): number =>
    t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1

  let start: number | undefined

  const step = (timestamp: number) => {
    if (start === undefined) start = timestamp
    // 计算时间的差值，根据差值计算偏移量
    const time = timestamp - start
    let percent = Math.min(time / duration, 1)
    percent = easing(percent)
    window.scrollTo(0, startingY + diff * percent)

    if (time < duration) {
      window.requestAnimationFrame(step)
    }
  }

  window.requestAnimationFrame(step)
}
export { getParam, scrollToElem }
