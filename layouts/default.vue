<template>
  <div class="min-h-screen flex flex-col items-center mx-auto overflow-auto">
    <div class="w-full">
      <NavBar />
    </div>
    <div class="flex-1 w-full max-w-screen-2xl">
      <div class="py-4 px-4 lg:px-12">
        <slot />
      </div>
    </div>
    <div class="w-full">
      <Footer />
    </div>
  </div>
</template>

<script setup>
const config = useRuntimeConfig()

// Head
useHead({
  title: 'Cytoid',
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { hid: 'description', name: 'description', content: config.public.description } // TODO: i18n description
  ],
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico', sizes: '64x64' },
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Nunito:300,300i,400,400i,700,700i&display=swap' },
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=M+PLUS+Rounded+1c:300,400&display=swap' }
  ],
  script: [
    { src: 'https://www.googletagmanager.com/gtag/js?id=' + config.public.analyticsCode, async: true },
    { innerHTML: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config','${config.public.analyticsCode}');` }
  ],
  __dangerouslyDisableSanitizers: ['script']
});

</script>