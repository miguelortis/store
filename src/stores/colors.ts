import axios from '@/axios'
import type { Color } from '@/models/color.interface'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useColorsStore = defineStore('colors', () => {
  const colors = ref<Color[]>([])
  const loading = ref(false)

  const fetchColors = async () => {
    if (loading.value) return

    try {
      loading.value = true
      const response = await axios.get('/colors', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      colors.value = response.data.data
    } catch (error) {
      console.error('Error al cargar colores:', error)
    } finally {
      loading.value = false
    }
  }

  return { fetchColors, colors, loading }
})
