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
export { getParam }
