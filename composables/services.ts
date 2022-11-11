import { UseFetchOptions } from '#app'
import { KeyOfRes } from 'nuxt/dist/app/composables/asyncData'

export async function useService<T>(
  url: string,
  options?:
    | UseFetchOptions<
        T extends void ? unknown : T,
        (res: T extends void ? unknown : T) => T extends void ? unknown : T,
        KeyOfRes<
          (res: T extends void ? unknown : T) => T extends void ? unknown : T
        >
      >
    | undefined
) {
  const config = useRuntimeConfig()
  const baseUrl = 'https://services.cytoid.io'

  return await useFetch<T>(`${baseUrl}${url}`, {
    ...options
  })
}

// export function useService(url:string) {
//   const config = useRuntimeConfig()
//   const baseUrl = 'https://services.cytoid.io'

//   return `${baseUrl}${url}`
// }