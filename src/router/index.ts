import { createRouter, createWebHistory } from 'vue-router'
import { routes } from '@/utils/routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
})

export default router
