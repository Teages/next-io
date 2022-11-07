import { Ref } from "vue"
import { useService } from "./services"

export const useAuth = () => {
  const user : Ref<UserData> = useState('user', () => null)

  const logout = async () => {
    const cookie = useCookie("cyt:sess")
    user.value = null
    cookie.value = null
    return await useService('/session', {
      method: 'DELETE'
    })
  }

  const loginWithCookie = async () => {
    const cookie = useCookie("cyt:sess")
    const { data: response } = await useService<SessionResponse>('/session')
    user.value = response.value.user
  }

  const login = async (payload) => {
    const { data: response } = await useService('/session', {
      method: 'POST',
      body: payload,
      credentials: 'include'
    })
    await loginWithCookie()
  }

  return {user, login, loginWithCookie, logout}
}

interface SessionResponse {
  token: string,
  user: UserData 
}

interface UserData {
  email: string,
  id: string,
  name?: string,
  uid: string,
  role: string
}