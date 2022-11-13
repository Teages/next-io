import { CookieOptions } from "#app"

export const returnIf = (b: boolean, value: any, noValue?: any) => {
  return b ? value : noValue
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