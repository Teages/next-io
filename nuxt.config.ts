import config from 'config'
import * as dotenv from 'dotenv'
import pkg from './package.json'

import * as locale from './locale'

dotenv.config()

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/apollo',
    '@vueuse/nuxt',
    'nuxt-proxy',
    '@nuxtjs/tailwindcss',
    'nuxt-icon',
    '@nuxtjs/i18n',
  ],

  i18n: {
    vueI18n: {
      legacy: false,
      locale: 'en',
      messages: locale
    }
  },

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
        websocketsOnly: false
      }
    },
  },

  runtimeConfig: {
    public: {
      assetURL: config.get('assetURL'),
      apiURL: config.get('serviceURLClient'),
      imageURL: config.get('imageURL'),
      webURL: config.get('webURL'),
      analyticsCode: config.get('analyticsCode'),
      captchaKey: config.get('captchaKey'),
      servicesUA: process.env.SERVICES_UA ?? '',
      description: pkg.description,
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
          'user-agent': process.env.SERVICES_UA ?? ''
        }
      }
    ]
  }
})
