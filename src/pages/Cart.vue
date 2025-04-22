<template>
  <div class="profile-view" @scroll="onScroll">
    <div class="card-container">
      <v-card
        v-if="cart.length > 0"
        v-for="(item, i) in cart"
        :key="i"
        variant="flat"
        class="mx-auto mt-4 d-flex card"
      >
        <div class="d-flex align-center justify-center c-img">
          <v-img
            v-if="item?.product?.image?.url"
            :src="item?.product?.image?.url"
            alt="Product Image"
            height="250"
            cover
          />
          <v-icon icon="mdi-image-broken-variant" class="n-img" />
        </div>
        <div class="w-100">
          <div class="c-title">
            <v-list-item-title v-text="item.product.name" />
            <div class="d-flex align-center">
              <v-rating
                :model-value="4.5"
                color="amber"
                density="compact"
                size="small"
                half-increments
                readonly
              />
              <div class="text-grey ms-2">4.5 (413)</div>
            </div>
            <span class="stock">{{
              `${item?.stock} ${item?.stock > 1 ? 'unidades' : 'unidad'}`
            }}</span>
          </div>
          <div class="c-subtitle">
            <div class="text-subtitle-1">
              {{ formatPrice(Number(item.product?.price)) }}
            </div>
            <div>{{ item.product?.description }}</div>
          </div>
        </div>
        <div class="c-icon">
          <v-btn density="default" variant="text" icon="mdi-dots-vertical" />
        </div>
      </v-card>
      <div v-if="!loading && cart.length === 0" class="no-products">
        No se encontraron productos.
      </div>
      <div v-if="loading" class="loading">
        <v-progress-circular indeterminate :size="35" :width="7" class="mr-2" />
        Cargando...
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '@/stores/cart'
import { formatPrice } from '@/utils/format'
import { infiniteScroll } from '@/utils/infinite-scroll'
import { storeToRefs } from 'pinia'

const { cart, loading } = storeToRefs(useCartStore())
const { fetchCart } = useCartStore()

const onScroll = (e: Event) => {
  infiniteScroll(e, fetchCart)
}

onMounted(() => {
  fetchCart()
})
</script>

<style scoped>
.profile-view {
  padding: 16px;
  max-height: calc(100vh - 64px);
  overflow: auto;
}
.card-container {
  max-width: 1070px;
  margin: auto;
  width: 100%;
}
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 16px;
}
.c-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 5px 10px;
}
.c-subtitle {
  display: flex;
  align-items: center;
  justify-content: start;
  width: 100%;
  padding: 5px 10px;
}
.c-img {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  width: 100px;
}
.c-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  width: 100px;
}
.card {
  padding: 20px;
}
@media screen and (max-width: 680px) {
  .card {
    flex-direction: column;
    align-items: center;
  }
  .c-title {
    flex-direction: column;
    align-items: flex-start;
    max-width: 100%;
  }
  .c-subtitle {
    flex-direction: column;
    align-items: flex-start;
    max-width: 100%;
  }
  .c-icon {
    position: absolute;
    top: 0;
    right: -10px;
  }
}
</style>
