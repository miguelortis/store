<template>
  <v-sheet class="d-flex flex-column">
    <v-snackbar
      v-model="snackbar"
      :timeout="time"
      :color="alertColor"
      variant="tonal"
    >
      {{ msg }}
    </v-snackbar>
  </v-sheet>
</template>

<script setup lang="ts">
import { useAlertStore } from '@/stores/alert'
import { computed, ref } from 'vue'

const alertStore = useAlertStore()
const snackbar = ref(alertStore.open)
const msg = computed(() => alertStore.msg)
const type = computed<string>(() => alertStore.alertType)
const time = computed(() => alertStore.alertTime)
const alertColor = computed(() => {
  const colors = { error: 'red', success: 'green', warning: 'yellow' }
  return colors[type.value as keyof typeof colors] || 'blue'
})
</script>
