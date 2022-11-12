import { VueReCaptcha, useReCaptcha } from 'vue-recaptcha-v3'
import { useNuxtApp } from '#app'

export const useVueReCaptcha = async () => {
  const { vueApp } = useNuxtApp()
  const config = useRuntimeConfig()
  vueApp.use(VueReCaptcha, {
    siteKey: config.public.captchaKey,
    loaderOptions: {
      autoHideBadge: false,
      useRecaptchaNet: true,
      renderParameters: {
        badge: 'bottomleft',
        size: 'invisible',
      }
    }
  })
  const reCaptcha = useReCaptcha()
  if (reCaptcha != undefined) {
    const { executeRecaptcha, recaptchaLoaded } = reCaptcha
    await recaptchaLoaded()
    return await executeRecaptcha('login')
  } else {
    return null
  }
}
