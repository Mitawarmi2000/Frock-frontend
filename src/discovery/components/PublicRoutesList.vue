<template>
  <div class="public-routes-container">
    <pb-Toast/>
    <pb-ProgressSpinner v-if="isLoading" />
    <pb-Message v-else-if="error" severity="error" :closable="false">
      {{ error }}
    </pb-Message>
    <template v-else-if="routes.length > 0">
      <section class="routes-grid">
        <PublicRouteCard
            v-for="route in routes"
            :key="route.id"
            :route="route"
        />
      </section>
    </template>
    <template v-else>
      <pb-Message severity="info" :closable="false">
        <template #icon>
          <i class="pi pi-info-circle"></i>
        </template>
        No hay rutas disponibles en este momento
      </pb-Message>
    </template>
  </div>
</template>

<script setup>
import PublicRouteCard from './PublicRouteCard.vue'

defineProps({
  routes: {
    type: Array,
    required: true
  },
  isLoading: {
    type: Boolean,
    default: false
  },
  error: {
    type: String,
    default: null
  }
})
</script>

<script>
export default {
  name: 'PublicRoutesList'
}
</script>

<style scoped>
.public-routes-container {
  padding: 2rem 0;
}

.routes-grid {
  display: flex;
  flex-direction: column;
  gap: 0;
}

@media (max-width: 640px) {
  .public-routes-container {
    padding: 1rem 0;
  }
}
</style>