
export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
 
 proxy: {
    '/api': {
      target: 'http://wwmtest.free.idcfengye.com', // 目标接口域名
      changeOrigin: true, // 表示是否跨域
      pathRewrite: {
        '^/api': '', // 把 /api 替换成 /
      }
    }
  },
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ],
    script:[
        {src:'https://cdnjs.cloudflare.com/ajax/libs/particlesjs/2.2.3/particles.min.js'},
        { src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color:'red'},
  /*
  ** Global CSS
  */
  css: [
    'element-ui/lib/theme-chalk/index.css',
    '~assets/css/normalize.css',
    '~assets/css/assembly.less'
  ],
  styleResources: {
    less: [
      './assets/css/main.less', // 全局 less 变量
    ]
  },
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/element-ui',
    '@/plugins/axios',
    {src : '~/plugins/particles' , ssr:false},
    { src: '@/plugins/vue-mavon-editor', ssr: false }
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/style-resources',
    '@nuxtjs/proxy'
  ],
  /*
  ** Build configuration
  */
  build: {
    transpile: [/^element-ui/],
    extractCSS:{allChunks:true},
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
