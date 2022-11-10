import { Ref } from "vue"
import { useService } from "./services"

export const useAuth = () => {
  const user : Ref<UserData | null> = useState('user')
  const cookie = useCookie<String | null>("cyt:sess")

  const logout = async () => {
    user.value = null
    cookie.value = null
    return await useFetch(useService('/session'), {
      method: 'DELETE'
    })
  }

  const loginWithCookie = async () => {
    let { data } = await useFetch<SessionResponse>(useService('/session'))
    if (!data.value) { // fxxk bug: get null when init App
      data = (await useFetch<SessionResponse>(useService('/session'))).data
    }
    user.value = data.value?.user ?? null
  }

  const login = async (payload:any) => {
    const { data: response } = await useFetch(useService('/session'), {
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