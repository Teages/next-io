import { formatDistanceToNow, parseISO, formatRelative } from 'date-fns'
import { enUS, zhCN, zhTW, ptBR, th, vi, ja, es, id, cs, de, hu, ko } from 'date-fns/locale'

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

export const dateLocales = Object.freeze({
  en: enUS,
  'zh-CN': zhCN,
  'zh-TW': zhTW,
  'zh-FJ': zhCN,
  'pt-BR': ptBR,
  'th-TH': th,
  'vi-VN': vi,
  'es-ES': es,
  'ja-JP': ja,
  'id-ID': id,
  'cs-CZ': cs,
  'ko-KR': ko,
  'de-DE': de,
  'hu-HU': hu,
})

export function dateFromNow (dateStr:string) {
  const locale = useLocales().locale.value
  return formatDistanceToNow(
    parseISO(dateStr),
    {
      addSuffix: true,
      // @ts-ignore
      locale: dateLocales[locale]
    }
  )
}
export function dateFormatCalendar (dateStr:string, from = new Date()) {
  const locale = useLocales().locale.value
  return formatRelative(
    parseISO(dateStr),
    from,
    {
      // @ts-ignore
      locale: dateLocales[locale]
    }
  )
}