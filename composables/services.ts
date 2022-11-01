import { UseFetchOptions } from "nuxt/app"
import { KeyOfRes } from "nuxt/dist/app/composables/asyncData"

export const useService = async (url:string, option?: UseFetchOptions<unknown, (res: unknown) => unknown, KeyOfRes<(res: unknown) => unknown>>) => {
  const baseUrl = '/services'
  return await useFetch(`${baseUrl}${url}`, option)
}