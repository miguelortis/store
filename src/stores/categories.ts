import axios from '@/axios'
import type { Category } from '@/models/category.interface'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCategoriesStore = defineStore('categories', () => {
  const categories = ref<Category[]>([])
  const loading = ref(false)

  const fetchCategories = async () => {
    if (loading.value) return

    try {
      loading.value = true
      const response = await axios.get('/categories', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      categories.value = response.data.data
    } catch (error) {
      console.error('Error al cargar categorías:', error)
    } finally {
      loading.value = false
    }
  }

  return { fetchCategories, categories, loading }
})
