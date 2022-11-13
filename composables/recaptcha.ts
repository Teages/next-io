import { load } from 'recaptcha-v3'

export const useCaptcha = async () => {
  const config = useRuntimeConfig()
  // const sitekey = config.public.captchaKey
  const sitekey = '6LfBxAEjAAAAALCTR6Y7b3KWYrWF6EnXpvGE7yB-' // self
  const recaptcha = await load(sitekey, {
    autoHideBadge: false,
    useRecaptchaNet: true,
    renderParameters: {
      badge: 'bottomleft',
      size: 'invisible',
    }
  })
  const token = await recaptcha.execute()
  return token
}
