export default {
  basurl: {
    dev: 'http://localhost:3000',
    prop: 'https://you.domain.com',
  },
  // 不需要带上token的路径
  publicPath: [/^\/public/, /^\/login/],
}
