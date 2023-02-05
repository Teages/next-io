import config from 'config'
import * as dotenv from 'dotenv'
import pkg from './package.json'

import * as locale from './locale'

dotenv.config()

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'Cytoid',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: pkg.description } // TODO: i18n description
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico', sizes: '64x64' }
      ],
      script: [
        { src: 'https://www.googletagmanager.com/gtag/js?id=' + config.get('analyticsCode'), async: true },
        { innerHTML: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config','${config.get('analyticsCode')}');` }
      ]
    }
  },

  modules: [
    '@nuxtjs/apollo',
    '@vueuse/nuxt',
    'nuxt-proxy',
    '@nuxtjs/tailwindcss',
    'nuxt-icon',
    '@nuxtjs/i18n',
    [
      '@nuxtjs/google-fonts', {
        families: {
          'Nunito': [300, 400, 700],
          'M PLUS Rounded 1c': [300]
        }
      }
    ]
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
        httpEndpoint: config.get('graphql'),
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
      captchaKey: config.get('captchaKey'),
      servicesUA: process.env.SERVICES_UA ?? '',
    }
  },

  nitro: {
    devProxy: {
      '/services': {
        target: config.get('serviceURLServer'),
        changeOrigin: true,
        prependPath: false,
        ws: true,
        cookieDomainRewrite: {
          'cytoid.io': 'localhost'
        }
      },
      '/graphql': {
        target: config.get('serviceURLServer') + '/graphql',
        changeOrigin: true,
        ws: true,
        cookieDomainRewrite: {
          'cytoid.io': 'localhost'
        }
      }
    }
  },
  
})
