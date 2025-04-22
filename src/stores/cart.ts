import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from '@/axios'
import type { FetchParams } from '@/models/fetch-params.interface'
import { formatQueryParams } from '@/utils/format'
import type { Cart } from '@/models/cart.interface'

export const useCartStore = defineStore('cart', () => {
  const cart = ref<Cart[]>([])
  const page = ref(1)
  const last_page = ref(1)
  const loading = ref(false)
  const params = ref<FetchParams>({})

  function setCart(pdts: Cart[]) {
    cart.value = [...cart.value, ...pdts]
  }

  function setPagination(pg: number, l_pg: number) {
    page.value = pg
    last_page.value = l_pg
  }

  const setParams = (newParams: FetchParams) => {
    params.value = { ...params.value, ...newParams }
  }

  function clearCart() {
    cart.value = []
    page.value = 1
  }

  const fetchCart = async () => {
    if (loading.value || page.value > last_page.value) return

    try {
      loading.value = true
      const response = await axios.get(
        `/carts?page=${page.value}&per_page=10&${formatQueryParams(params.value)}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      )
      setCart(response.data.data)
      setPagination(
        response.data.meta.current_page + 1,
        response.data.meta.last_page
      )
    } catch (error) {
      console.error(error)
    } finally {
      loading.value = false
    }
  }

  return {
    fetchCart,
    cart,
    setCart,
    page,
    last_page,
    loading,
    params,
    setParams,
    setPagination,
    clearCart,
  }
})
