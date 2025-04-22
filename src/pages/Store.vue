<template>
  <div class="store-view" @scroll="onScroll">
    <div class="input-filter">
      <div class="search-input">
        <v-text-field
          append-inner-icon="mdi-magnify"
          density="compact"
          clearable
          placeholder="Buscar productos..."
          v-model="search"
        ></v-text-field>
      </div>
      <div class="select-group">
        <div class="category-select">
          <v-select
            class="select"
            clearable
            label="Categorías"
            density="compact"
            item-title="name"
            item-value="uuid"
            :items="categories"
            v-model="select"
          />
        </div>
        <div class="color-select">
          <v-select
            class="select"
            clearable
            label="Colores"
            density="compact"
            item-title="name"
            item-value="uuid"
            :items="colors"
            v-model="colorSelect"
          >
            <template v-slot:item="{ props: itemProps, item }">
              <v-list-item
                v-bind="itemProps"
                :baseColor="item.raw.hex"
                variant="flat"
              ></v-list-item>
            </template>
          </v-select>
        </div>
      </div>
    </div>
    <Products />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import Products from '@/components/Products.vue'
import { useCategoriesStore } from '@/stores/categories'
import { useColorsStore } from '@/stores/colors'
import { useProductsStore } from '@/stores/products'
import { infiniteScroll } from '@/utils/infinite-scroll'
import { debounce } from '@/utils/debounce'

const select = ref<string>()
const colorSelect = ref<string>()
const search = ref<string>()
const { fetchProducts, setParams, clearProducts } = useProductsStore()
const { fetchCategories } = useCategoriesStore()
const { categories } = storeToRefs(useCategoriesStore())
const { fetchColors } = useColorsStore()
const { colors } = storeToRefs(useColorsStore())

const handleSearch = () => {
  const params: {
    category_uuid?: string
    color_uuid?: string
    search_key?: string
  } = {}
  if (select.value) {
    params.category_uuid = select.value
  }
  if (colorSelect.value) {
    params.color_uuid = colorSelect.value
  }
  if (search.value) {
    params.search_key = search.value
  }
  setParams(params)
  clearProducts()
  fetchProducts()
}

const debouncedHandleSearch = debounce(handleSearch, 500)

watch([select, colorSelect, search], () => {
  debouncedHandleSearch()
})

const onScroll = async (event: Event) => {
  infiniteScroll(event, fetchProducts)
}

onMounted(() => {
  fetchCategories()
  fetchColors()
  fetchProducts()
})
</script>

<style scoped>
.store-view {
  padding: 0px 16px 16px 16px;
  max-height: calc(100vh - 64px);
  overflow: auto;
}
.input-filter {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding-top: 10px;
}
.category-select {
  width: 100%;
}
.color-select {
  width: 100%;
}
.search-input {
  width: 400px;
}
.color-item {
  display: flex;
  align-items: center;
}
.color-circle {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: 8px;
}
.select-group {
  display: flex;
  width: 400px;
}

@media screen and (max-width: 450px) {
  .search-input,
  .select-group {
    max-width: 90%;
  }
}
</style>
