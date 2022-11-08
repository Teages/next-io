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
    let { data } = await useService<SessionResponse>('/session')
    if (!data.value) { // fxxk bug: get null when init App
      data = (await useService<SessionResponse>('/session')).data
    }
    user.value = data.value.user
  }

  const login = async (payload) => {
    const { data: response } = await useService('/session', {
      method: 'POST',
      body: payload,
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