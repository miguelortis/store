import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAlertStore = defineStore('alert', () => {
  const open = ref(false)
  const msg = ref('')
  const alertType = ref('')
  const alertTime = ref(3000)

  function showAlert(
    message: string,
    type: string = 'success',
    timeout: number = 3000
  ) {
    msg.value = message
    open.value = true
    alertType.value = type
    alertTime.value = timeout

    setTimeout(resetAlert, timeout)
  }

  function resetAlert() {
    open.value = false
    msg.value = ''
    alertType.value = ''
    alertTime.value = 3000
  }

  return { open, msg, alertType, alertTime, showAlert }
})
