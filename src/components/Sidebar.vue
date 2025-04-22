<template>
  <div class="sidebar">
    <v-navigation-drawer location="left" v-model="drawerStatus" temporary>
      <div class="content-drawer">
        <div>
          <v-list-item v-for="(item, i) in selectItems" :key="i">
            <v-btn class="menu-btn" @click="navigationTo(item.path)">
              <v-icon class="btn-icon">{{ item.icon }}</v-icon>
              {{ item.name }}
            </v-btn>
          </v-list-item>
        </div>
        <div>
          <v-list-item>
            <v-btn width="100%" @click="logout"> Cerrar sesión </v-btn>
          </v-list-item>
        </div>
      </div>
    </v-navigation-drawer>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { privateRoutes } from '@/utils/routes'
import type { Route } from '@/models/route.interface'

const router = useRouter()
const { clearUser } = useUserStore()

const drawerStatus = defineModel('drawer', {
  type: Boolean,
  default: false,
})
defineProps<{
  drawer: boolean | undefined
}>()
const logout = async () => {
  clearUser()
  router.push('/login')
}
const navigationTo = (route: string) => {
  router.push(route)
}

const selectItems = privateRoutes.filter((item: Route) => !item.hidden)
</script>

<style scoped>
.content-drawer {
  padding: 5px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.menu-btn {
  display: flex;
  width: 100%;
  justify-content: start;
}
.btn-icon {
  margin-right: 10px;
}
</style>
