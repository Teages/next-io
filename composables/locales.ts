

export const useLocales = () => {
  const { availableLocales, locale, setLocale: i18nSetLocale } = useI18n()
  
  availableLocales.splice(availableLocales.indexOf('default'), 1)
  
  const cookie = useCookie('locale', {default: getDefaultCookie})
  
  const setLocale = (code:string) => {
    cookie.value = code
    i18nSetLocale(code)
    useHead({
      htmlAttrs:{
        lang: code
      }
    })
  }
  
  setLocale(cookie.value)

  return { availableLocales, locale, setLocale }
  function getDefaultCookie() {
    const headers = useRequestHeaders(['accept-language'])
    console.log(headers)
    return 'en'
  }
}