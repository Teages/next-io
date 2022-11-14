import { $fetch } from 'ohmyfetch'

// const services = useService()
// services('/url')
export const useService = () => {
  const config = useRuntimeConfig()
  const baseURL = config.public.apiURL
  return $fetch.create({
    baseURL: baseURL,
    credentials: 'include'
  })
}

export function useServiceUrl(url:string) {
  const config = useRuntimeConfig()
  const baseURL = config.public.apiURL
  return `${baseURL}${url}`
}