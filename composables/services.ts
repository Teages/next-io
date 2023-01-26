import { $fetch } from 'ohmyfetch'

export const useService = () => {
  const config = useRuntimeConfig()
  const baseURL = config.public.apiURL
  return $fetch.create({
    baseURL: baseURL,
    credentials: 'include'
  })
}

export function useServiceUrl(url: string) {
  const config = useRuntimeConfig()
  const baseURL = config.public.apiURL
  return `${baseURL}${url}`
}

export const avatarURL = (userId?: string, size?: number) => {
  if (userId == null) {
    return 'https://artifacts.cytoid.io/avatar.jpg'
  }

  let url = useServiceUrl(`/users/${userId}/avatar`)
  if (size) {
    url += '?size=' + size
  }

  return url
} 