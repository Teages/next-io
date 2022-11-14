import { Ref } from "vue"

export const useAlert = () => {
  const alerts:Ref<alertData[]> = useState(() => [])

  const addAlert = (alert:alertData) => {
    alerts.value.push({
      ...alert,
      loading: useState(() => null)
    })
  }

  const addLoadingAlert = (alert:alertData) => {
    const loading = useState(() => true)
    alerts.value.push({
      ...alert,
      loading: loading
    })
    return () => {
      loading.value = false
    }
  }

  return { alerts, addAlert, addLoadingAlert }
}


interface alertData {
  type?: string,
  message: string,
  icon?: string,
  details?: string,
  loading?: Ref<boolean | null>
}
