const isDev = import.meta.env.MODE === 'development'
export default {
  basurl: {
    dev: 'http://localhost:3000',
    prop: 'https://you.domain.com',
  },
  // 不需要带上token的路径
  publicPath: [/^\/public/, /^\/login/],
  wsconfig: {
    url: isDev ? '127.0.0.1' : 'api.dev.youzi.cn',
    port: isDev ? '3001' : 22001,
  },
}
