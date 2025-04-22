<template>
  <div class="profile-view">
    <v-card
      variant="flat"
      class="mx-auto"
      color="surface-variant"
      max-width="590"
    >
      <div class="d-flex align-center pa-4">
        <v-avatar color="red">
          <span class="text-h5">{{
            getNameInitials(userInfo?.name || '')
          }}</span>
        </v-avatar>
        <div class="d-flex flex-column ml-4">
          <span class="text-h5 font-weight-bold ml-2">{{
            userInfo?.name
          }}</span>
          <span class="text-caption font-weight-light ml-2">{{
            userInfo?.email
          }}</span>
        </div>
      </div>
    </v-card>
    <v-card
      variant="flat"
      class="mx-auto mt-4"
      color="surface-variant"
      max-width="590"
    >
      <v-list variant="tonal">
        <v-list-item
          height="80px"
          v-for="(item, i) in items"
          :key="i"
          :value="item"
        >
          <template #prepend>
            <v-icon :icon="item.icon" />
          </template>
          <v-list-item-title v-text="item.name" />
          <template #append>
            <v-icon icon="mdi-chevron-right" />
          </template>
        </v-list-item>
      </v-list>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { getNameInitials } from '@/utils/get-name-initials'
import { storeToRefs } from 'pinia'

const { userInfo } = storeToRefs(useUserStore())
const items = [
  { id: 1, icon: 'mdi-card-account-details', name: 'Información Personal' },
  { id: 2, icon: 'mdi-account', name: 'Datos de la cuenta' },
  { id: 3, icon: 'mdi-lock', name: 'Seguridad' },
  { id: 4, icon: 'mdi-account', name: 'Privacidad' },
]
</script>

<style scoped>
.profile-view {
  padding: 16px;
  max-height: calc(100vh - 64px);
  overflow: auto;
}
</style>
