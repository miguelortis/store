import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from '@/axios'
import type { FetchParams } from '@/models/fetch-params.interface'
import type { Product } from '@/models/product.interface'
import { formatQueryParams } from '@/utils/format'

export const useProductsStore = defineStore('products', () => {
  const products = ref<Product[]>([])
  const page = ref(1)
  const last_page = ref(1)
  const loading = ref(false)
  const params = ref<FetchParams>({})

  function setProducts(pdts: Product[]) {
    products.value = [...products.value, ...pdts]
  }

  function setPagination(pg: number, l_pg: number) {
    page.value = pg
    last_page.value = l_pg
  }

  function clearProducts() {
    products.value = []
    page.value = 1
  }

  const setParams = (newParams: FetchParams) => {
    params.value = { ...params.value, ...newParams }
  }

  const fetchProducts = async () => {
    if (loading.value || page.value > last_page.value) return

    try {
      loading.value = true
      const response = await axios.get(
        `/shop?page=${page.value}&per_page=10&${formatQueryParams(params.value)}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      )
      setProducts(response.data.data)
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
    fetchProducts,
    products,
    page,
    last_page,
    loading,
    params,
    setParams,
    setProducts,
    setPagination,
    clearProducts,
  }
})
