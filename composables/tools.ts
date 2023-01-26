import { CookieOptions } from "#app"

export const returnIf = (b: boolean, value: any, noValue?: any) => {
  return b ? value : noValue
}

export const addClassIf = (origin:string, addition:string, bool:boolean) => {
  if (bool) {
    return `${origin} ${addition}`
  }
  return origin
}

export function useSavedCookie<T = string>(name: string, _opts?: CookieOptions<T>) {
  return useCookie(name, {
    maxAge: 34560000,
    ..._opts
  })
}

export function wait(sec:number = 0.001) {
  return new Promise((resolve) => {
    setTimeout(resolve, sec * 1000)
  }) 
}

export function formatBytes (bytes:number) {
  if ((bytes >> 30) & 0x3FF) {
    return (bytes >>> 30) + '.' + (bytes & (3 * 0x3FF)).toString().substring(0, 2) + ' GB'
  } else if ((bytes >> 20) & 0x3FF) {
    return (bytes >>> 20) + '.' + (bytes & (2 * 0x3FF)).toString().substring(0, 2) + ' MB'
  } else if ((bytes >> 10) & 0x3FF) {
    return (bytes >>> 10) + '.' + (bytes & (0x3FF)).toString().substring(0, 2) + ' KB'
  } else if ((bytes >> 1) & 0x3FF) {
    return (bytes >>> 1) + ' Bytes'
  } else {
    return bytes + ' Byte'
  }
}

export class Meta {
  meta: { hid: string; name: string; content: string }[]
  title: string
  constructor(title:string, description:string, verb = null) {
    if (description.length > 100) {
      description = description.substring(0, 100)
    }
    this.title = title + ' - Cytoid'
    if (verb) {
      this.title = verb + ' ' + this.title
    }
    this.meta = [
      { hid: 'description', name: 'description', content: description },
      { hid: 'og:description', name: 'og:description', content: description },
      { hid: 'name', name: 'name', content: title },
      { hid: 'og:title', name: 'og:title', content: title },
    ]
  }
  extend(id:string, content:string) {
    this.meta.push({
      hid: id,
      name: id,
      content
    })
  }
}

