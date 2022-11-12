export const useLocales = () => {
  const { availableLocales, locale, setLocale: i18nSetLocale } = useI18n()
  
  availableLocales.splice(availableLocales.indexOf('default'), 1)
  
  const cookie = useSavedCookie('locale')
  
  const setLocale = (code:string) => {
    cookie.value = code
    i18nSetLocale(code)
    useHead({
      htmlAttrs:{
        lang: code
      }
    })
  }
  
  i18nSetLocale(cookie.value || 'en')

  return { availableLocales, locale, setLocale, localeCookie: cookie }
}