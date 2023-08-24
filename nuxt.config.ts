// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      titleTemplate: '%s - 小张想上天的博客',
      title: '小张想上天的博客',
      charset: 'utf-8',
      htmlAttrs: {
        lang: 'zh-cn',
      },
      meta: [
        { name: 'description', content: '小张想上天的博客' },
        { name: 'keywords', content: '博客 小张想上天' },
      ],
      script: [
        // { src:"http://xxx.js" }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: 'favicon.ico' },
        // { rel:"stylesheet",href:"http://xxx.css" }
      ],
    },
  },
  css: [
    '@/assets/main.css',
    '@/assets/update-naive.css',
    '@/assets/styles/animation.css',
  ],
  build: {
    transpile:
      process.env.NODE_ENV === 'production'
        ? [
            'naive-ui',
            'vueuc',
            '@css-render/vue3-ssr',
            '@juggle/resize-observer',
          ]
        : ['@juggle/resize-observer'],
  },
  vite: {
    optimizeDeps: {
      include:
        process.env.NODE_ENV === 'development'
          ? ['naive-ui', 'vueuc', 'date-fns-tz/esm/formatInTimeZone']
          : [],
    },
  },
  imports: {
    dirs: ['apis'],
  },
  nitro: {
    // 缩小捆绑包
    minify: true,
    // 关闭源映射生成
    sourceMap: false,
  },
});
