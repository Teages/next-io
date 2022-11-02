import { VueReCaptcha, useReCaptcha } from 'vue-recaptcha-v3'
import { useNuxtApp } from '#app'

export const useVueReCaptcha = async () => {
  const { vueApp } = useNuxtApp()
  const config = useRuntimeConfig()
  vueApp.use(VueReCaptcha, {
    siteKey: config.public.captchaKey,
    loaderOptions: {
      autoHideBadge: false,
      // renderParameters: {
      //   badge: 'bottomleft',
      //   size: 'invisible',
      // }
    }
  })
  const { executeRecaptcha, recaptchaLoaded } = useReCaptcha()
  await recaptchaLoaded()
  return await executeRecaptcha('login')
}
