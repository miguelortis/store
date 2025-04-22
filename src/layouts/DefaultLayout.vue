<template>
  <v-main>
    <v-app-bar :elevation="2">
      <template v-slot:prepend>
        <v-app-bar-nav-icon
          variant="text"
          @click.stop="drawer = !drawer"
        ></v-app-bar-nav-icon>
        <v-img
          src="@/assets/shop-image.png"
          alt="Shop ico"
          class="img"
          width="40px"
          height="40px"
        />
      </template>
      <v-app-bar-title width="500px">Mi Tienda</v-app-bar-title>
    </v-app-bar>
    <Sidebar :drawer="drawer" v-model:drawerStatus="drawer" />
    <router-view />
  </v-main>
</template>

<script lang="ts" setup>
import Sidebar from '@/components/Sidebar.vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const { fetchCurrentUser } = useUserStore()
const drawer = ref<boolean>()

onMounted(async () => {
  await fetchCurrentUser()
})
</script>
