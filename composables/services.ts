import { $fetch } from 'ohmyfetch'
import config from 'config'

export const useService = $fetch.create({
  baseURL: 'http://localhost:4000',
  credentials: 'include'
})

export function useServiceUrl(url:string) {
  const config = useRuntimeConfig()
  const baseURL = config.public.apiURL
  return `${baseURL}${url}`
}