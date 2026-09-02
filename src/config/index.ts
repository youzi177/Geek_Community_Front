const isDev = import.meta.env.MODE === 'development'
export default {
  basurl: {
    dev: 'http://192.168.2.138:3000',
    prop: 'https://you.domain.com',
  },
  // 不需要带上token的路径
  publicPath: [/^\/public/, /^\/login/],
  wsconfig: {
    url: isDev ? '192.168.2.138' : 'api.dev.youzi.cn',
    port: isDev ? '3001' : 22001,
  },
}
