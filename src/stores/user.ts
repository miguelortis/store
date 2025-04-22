import axios from '@/axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useAlertStore } from './alert'
import type { User } from '@/models/product.interface'

export const useUserStore = defineStore('user', () => {
  const alertStore = useAlertStore()
  const userInfo = ref<User | null>(null)
  const loading = ref(false)

  function setUser(user: User) {
    userInfo.value = user
  }

  function clearUser() {
    userInfo.value = null
    localStorage.removeItem('token')
  }

  const fetchCurrentUser = async () => {
    if (!localStorage.getItem('token') || loading.value) return

    try {
      loading.value = true
      const response = await axios.get('/me', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      setUser(response.data.data)
    } catch (error) {
      console.error(error)
      alertStore.showAlert('Error al obtener los datos del usuario', 'error')
    } finally {
      loading.value = false
    }
  }

  return { fetchCurrentUser, userInfo, setUser, clearUser, loading }
})
