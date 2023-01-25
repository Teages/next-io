import { Ref } from "vue"
import { useService } from "./services"

export const useAuth = () => {
  const user : Ref<UserData | null | undefined> = useState('user')
  const cookie = useSavedCookie<String | null>("cyt:sess")
  const services = useService()
  
  const isLogin = () => !(user.value == null) // is a valid login
  const loginTrying = useState(() => false) // updating login state

  const logout = async () => {
    user.value = null
    cookie.value = null
    return await services<SessionResponse>('/session', {
      method: 'DELETE'
    })
  }

  const loginWithCookie = async () => {
    const data = await services<SessionResponse>('/session')
    user.value = data.user
    return data.user
  }

  const loginWithPayload = async (payload:Payload) => {
    const data = await services<SessionResponse>('/session', {
      method: 'POST',
      body: payload,
    })
    // console.log(data)
    user.value = data.user ?? null
    return data.user
  }

  return { user, loginWithPayload, loginWithCookie, logout, isLogin, loginTrying }
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

interface Payload {
  username: string,
  password: string,
  remember: boolean,
  captcha: string
}