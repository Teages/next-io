const pendingAlert = ref([])

const alertExist = 3000 // ms

export const useAlert = () => {
  const running = ref(false)
  const showingAlert = ref([])

  const addAlert = (alert:alertData) => {

    if (!running) {
      updateAlert()
    }
  }

  return {showingAlert, addAlert, pendingAlert}

  function updateAlert() {

    if (pendingAlert.value.length + showingAlert.value.length > 0) {
      running.value = true
      setTimeout(updateAlert, 500)
    } else {
      running.value = false
    }
  }
}


interface alertData {
  type: string,
  message: string,
  icon?: string,
  details?: string
}

interface onboardAlert {
  data: alertData,
  timeout: number
}