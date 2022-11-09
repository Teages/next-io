import config from 'config'
import * as dotenv from 'dotenv'
const pkg = require('./package.json')

dotenv.config()

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/apollo',
    '@vueuse/nuxt',
    'nuxt-proxy',
    '@nuxtjs/tailwindcss',
    'nuxt-icon',
  ],

  apollo: {
    clients: {
      default: {
        tokenName: 'cyt:sess',
        cookieAttributes: {
          path: '/',
          secure: false,
        },
        httpEndpoint: config.get('webURL') + '/graphql',
        httpLinkOptions: {
          credentials: 'include'
        },
        wsEndpoint: null,
        websocketsOnly: false
      }
    },
  },

  
  head: {
    title: 'Cytoid',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico', sizes: '64x64' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Nunito:300,300i,400,400i,700,700i&display=swap' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=M+PLUS+Rounded+1c:300,400&display=swap' }
    ],
    script: [
      { src: 'https://www.googletagmanager.com/gtag/js?id=' + config.get('analyticsCode'), async: true },
      { innerHTML: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config','${config.get('analyticsCode')}');` }
    ],
    __dangerouslyDisableSanitizers: ['script']
  },

  runtimeConfig: {
    public: {
      assetURL: config.get('assetURL'),
      apiURL: config.get('serviceURLClient'),
      imageURL: config.get('imageURL'),
      webURL: config.get('webURL'),
      analyticsCode: config.get('analyticsCode'),
      captchaKey: config.get('captchaKey'),
    }
  },
  
  proxy: {
    options: [
      {
        target: config.get('serviceURLClient'),
        changeOrigin: true,
        pathRewrite: {
          '^/services': '/'
        },
        pathFilter: [
          '/services',
          '/graphql'
        ],
        headers: {
          'user-agent': process.env.SERVICES_UA
        }
      }
    ]
  }
})
