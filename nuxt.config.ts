import config from 'config'
import * as dotenv from 'dotenv'
import pkg from './package.json'

dotenv.config()

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },

  modules: [
    '@vueuse/nuxt',
    '@nuxtjs/tailwindcss',
    'nuxt-icon',
    '@nuxtjs/i18n',
    '@nuxtjs/google-fonts',
    'vue-recaptcha/nuxt',
    '@vite-pwa/nuxt',
  ],

  i18n: {
    locales: [
      { name: 'Čeština', code: 'cs-CZ', file: 'cs-CZ/index.ts' },
      { name: 'Deutsch', code: 'de-DE', file: 'de-DE/index.ts' },
      { name: 'English', code: 'en', file: 'en/index.ts' },
      { name: 'Inglés', code: 'es-ES', file: 'es-ES/index.ts' },
      { name: 'Português', code: 'pt-BR', file: 'pt-BR/index.ts' },
      { name: 'Tiếng Việt', code: 'vi-VN', file: 'vi-VN/index.ts' },
      { name: 'Tagalog', code: 'tl-PH', file: 'tl-PH/index.ts' },
      { name: 'ภาษาไทย', code: 'th-TH', file: 'th-TH/index.ts' },
      { name: '日本語', code: 'ja-JP', file: 'ja-JP/index.ts' },
      { name: '한국어', code: 'ko-KR', file: 'ko-KR/index.ts' },
      { name: 'Bahasa Inggris', code: 'id-ID', file: 'id-ID/index.ts' },
      { name: 'Français', code: 'fr-FR', file: 'fr-FR/index.ts' },
      { name: 'Angol', code: 'hu-HU', file: 'hu-HU/index.ts' },
      { name: 'Malay', code: 'ms-MY', file: 'ms-MY/index.ts' },
      { name: 'Russian', code: 'ru-RU', file: 'ru-RU/index.ts' },
      { name: '中文（简体）', code: 'zh-CN', file: 'zh-CN/index.ts' },
      { name: '中文（繁體）', code: 'zh-TW', file: 'zh-TW/index.ts' },
      { name: '中文（符语）', code: 'zh-FJ', file: 'zh-FJ/index.ts' },
    ],
    lazy: true,
    langDir: 'locale',
    defaultLocale: 'en',
    strategy: 'no_prefix',
    experimental: {
      jsTsFormatResource: true,
    },
    vueI18n: './i18n.config.ts',
  },

  googleFonts: {
    download: false, // speed up dev by not downloading fonts
    overwriting: false,
    families: {
      'Nunito': [300, 400, 700],
      'M PLUS Rounded 1c': [300],
      'Noto Sans': true,
      'Noto Sans SC': true,
      'Noto Sans TC': true,
      'Noto Sans JP': true,
      'Noto Sans KR': true,
    },
  },

  runtimeConfig: {
    public: {
      assetURL: config.get('assetURL'),
      staticURL: config.get('staticURL'),
      serviceURLClient: config.get('serviceURLClient'),
      serviceURLServer: config.get('serviceURLServer'),
      imageURL: config.get('imageURL'),
      webURL: config.get('webURL'),
      graphqlURLServer: config.get('graphqlURLServer'),
      graphqlURLClient: config.get('graphqlURLClient'),
      servicesUA: process.env.SERVICES_UA ?? '',
      recaptcha: {
        v2SiteKey: config.get('captchaKey'),
      },
    },
  },

  graphqlCodegen: {
    config: {
      schema: 'gql/schema.graphql',
      documents: ['**/*.vue'],
      ignoreNoDocuments: true, // for better experience with the watcher
      generates: {
        './gql/': {
          preset: 'client',
          presetConfig: {
            fragmentMasking: false,
          },
          config: {
            useTypeImports: true,
          },
        },
      },
    },
  },

  typescript: {
    tsConfig: {
      include: ['types/**/*'],
    },
  },

  app: {
    head: {
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: pkg.description }, // would be replace in runtime
      ],
      link: [
        { rel: 'icon', href: '/favicon.ico', sizes: 'any', type: 'image/vnd.microsoft.icon' },
        { rel: 'icon', href: '/images/icon.png', type: 'image/png' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon-180x180.png' },
      ],
      script: [
        { src: 'https://polyfill.io/v3/polyfill.min.js?version=3.110.1' },
        { src: `https://www.googletagmanager.com/gtag/js?id=${config.get('analyticsCode')}`, async: true },
        { innerHTML: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config','${config.get('analyticsCode')}');` },
      ],
    },
  },

  pwa: process.env.NODE_ENV === 'production'
    ? {
        // registerType: 'autoUpdate',
        // manifest: {
        //   name: 'Cytoid IO',
        //   short_name: 'CytoidIO',
        //   theme_color: '#a5b4fc',
        //   icons: [
        //     {
        //       src: 'pwa-64x64.png',
        //       sizes: '64x64',
        //       type: 'image/png',
        //     },
        //     {
        //       src: 'pwa-192x192.png',
        //       sizes: '192x192',
        //       type: 'image/png',
        //     },
        //     {
        //       src: 'pwa-512x512.png',
        //       sizes: '512x512',
        //       type: 'image/png',
        //     },
        //     {
        //       src: 'pwa-512x512.png',
        //       sizes: '512x512',
        //       type: 'image/png',
        //       purpose: 'any',
        //     },
        //     {
        //       src: 'maskable-icon-512x512.png',
        //       sizes: '512x512',
        //       type: 'image/png',
        //       purpose: 'maskable',
        //     },
        //   ],
        // },
        // workbox: {
        //   navigateFallback: '/',
        //   globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
        // },
        // client: {
        //   installPrompt: true,
        //   // you don't need to include this: only for testing purposes
        //   // if enabling periodic sync for update use 1 hour or so (periodicSyncForUpdates: 3600)
        //   // periodicSyncForUpdates: 20,
        // },
        // devOptions: {
        //   enabled: true,
        //   suppressWarnings: true,
        //   navigateFallbackAllowlist: [/^\/$/],
        //   type: 'module',
        // },
      }
      // disable PWA in dev
    : {},

  routeRules: {
    // prerender
    '/': { prerender: true },
    '/pages/dmca': { prerender: true },
    '/pages/terms': { prerender: true },
    '/session/**': { prerender: true },

    // swr 3600s
    '/levels/**': { swr: 3600 },
    '/collection/**': { swr: 3600 },
    '/profile/**': { swr: 3600 },
    '/posts/**': { swr: 3600 },

    // no ssr
    '/settings/**': { ssr: false },
    '/studio/**': { ssr: false },
  },

  legacy: {
    targets: [
      'last 2 versions and not dead',
      '> 0.3%',
      'Firefox ESR',
      'iOS >= 13.2',
    ],
    polyfills: [
      'es.object.has-own',
    ],
    modernPolyfills: [
      'es.object.has-own',
    ],
  },

  // dev proxy
  nitro: {
    devProxy: {
      '/services': {
        target: config.get('serviceURLServer'),
        changeOrigin: true,
        prependPath: false,
        ws: true,
        headers: {
          'user-agent': process.env.SERVICES_UA ?? '',
        },
        cookieDomainRewrite: {
          'cytoid.io': 'localhost',
        },
      },
      '/graphql': {
        target: config.get('graphqlURLServer'),
        changeOrigin: true,
        ws: true,
        headers: {
          'user-agent': process.env.SERVICES_UA ?? '',
        },
        cookieDomainRewrite: {
          'cytoid.io': 'localhost',
        },
      },
    },
  },

  vite: {
    clearScreen: false,
  },
})
