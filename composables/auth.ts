import { useService } from "./services"
export const useAuth = () => {
  const user = useState('user', () => null)
  const login = async (payload) => {
    const { data: response } = await useService('/session', {
      method: 'POST',
      body: payload,
      credentials: 'include'
    })
    console.log(response)
    user.value = response
    return user.value
  }
  const logout = async () => {
    user.value = null
    return await useService('/session', {
      method: 'DELETE'
    })
  }
  return {user, login, logout}
}