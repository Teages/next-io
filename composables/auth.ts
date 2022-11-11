import { Ref } from "vue"
import { useService } from "./services"

export const useAuth = () => {
  const user : Ref<UserData | null> = useState('user')
  const cookie = useCookie<String | null>("cyt:sess")

  const logout = async () => {
    user.value = null
    cookie.value = null
    return await useService('/session', {
      method: 'DELETE'
    })
  }

  const loginWithCookie = async () => {
    let { data } = await useService<SessionResponse>('/session')
    if (!data.value) { // fxxk bug: get null when init App
      data = (await useService<SessionResponse>('/session')).data
    }
    user.value = data.value?.user ?? null
  }

  const login = async (payload:any) => {
    const { data: response } = await useService('/session', {
      method: 'POST',
      body: payload,
    })
    await loginWithCookie()
  }

  const isLogin = () => !(user.value == null)

  const needLogin = () => (cookie.value == null)

  return {user, login, loginWithCookie, logout, isLogin, needLogin}
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