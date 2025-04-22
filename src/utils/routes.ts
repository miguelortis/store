import {
  type NavigationGuardNext,
  type RouteLocationNormalized,
} from 'vue-router'
import AuthLayout from '@/layouts/AuthLayout.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { isAuthenticated } from '@/utils/auth'

const publicRoutes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/pages/Login.vue'),
    beforeEnter: (
      to: RouteLocationNormalized,
      from: RouteLocationNormalized,
      next: NavigationGuardNext
    ) => {
      if (isAuthenticated()) {
        next('/')
      } else {
        next()
      }
    },
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/pages/Register.vue'),
    beforeEnter: (
      to: RouteLocationNormalized,
      from: RouteLocationNormalized,
      next: NavigationGuardNext
    ) => {
      if (isAuthenticated()) {
        next('/')
      } else {
        next()
      }
    },
  },
]

export const privateRoutes = [
  {
    icon: 'mdi-home',
    path: '/',
    name: 'Dashboard',
    component: () => import('@/pages/Store.vue'),
    beforeEnter: (
      to: RouteLocationNormalized,
      from: RouteLocationNormalized,
      next: NavigationGuardNext
    ) => {
      if (!isAuthenticated()) {
        next('/login')
      } else {
        next()
      }
    },
  },
  {
    icon: 'mdi-account',
    path: '/profile',
    name: 'Perfil',
    component: () => import('@/pages/Profile.vue'),
    beforeEnter: (
      to: RouteLocationNormalized,
      from: RouteLocationNormalized,
      next: NavigationGuardNext
    ) => {
      if (!isAuthenticated()) {
        next('/login')
      } else {
        next()
      }
    },
  },
  {
    icon: 'mdi-cart-variant',
    path: '/cart',
    name: 'Carrito',
    component: () => import('@/pages/Cart.vue'),
    beforeEnter: (
      to: RouteLocationNormalized,
      from: RouteLocationNormalized,
      next: NavigationGuardNext
    ) => {
      if (!isAuthenticated()) {
        next('/login')
      } else {
        next()
      }
    },
  },
]

export const routes = [
  {
    name: 'AuthRoutes',
    path: '/auth',
    component: AuthLayout,
    hidden: true,
    children: publicRoutes,
  },
  {
    name: 'PrivateRoutes',
    hidden: true,
    path: '/',
    component: DefaultLayout,
    children: privateRoutes,
  },
]
