<template>
  <div class="route-detail-page">
    <pb-Toast />
    <pb-ProgressSpinner v-if="isLoading" />
    <pb-Message v-else-if="error" severity="error">{{ error }}</pb-Message>

    <template v-else-if="routeData && routeData.stops && routeData.stops.length >= 2">
      <!-- Header con botón volver -->
      <div class="detail-header">
        <button
            class="btn-back"
            @click="goBack"
        >
          <i class="pi pi-arrow-left"></i>
          Volver
        </button>
      </div>

      <!-- Card principal con información de la ruta -->
      <div class="route-detail-card">
        <!-- Nombre de la empresa -->
        <div class="company-header" v-if="companyName">
          <i class="pi pi-building"></i>
          <span>{{ companyName }}</span>
        </div>

        <!-- Sección de paraderos -->
        <div class="stops-section">
          <div class="stop-detail">
            <div class="stop-image-large">
              <img :src="routeData.stops[0].image_url" :alt="routeData.stops[0].name" />
            </div>
            <div class="stop-info">
              <h2 class="stop-name">{{ routeData.stops[0].name }}</h2>
              <p class="stop-address">
                <i class="pi pi-map-marker"></i>
                {{ routeData.stops[0].address }}
              </p>
              <p class="stop-district" v-if="routeData.stops[0].district">
                <i class="pi pi-building"></i>
                {{ routeData.stops[0].district.name }}
              </p>
            </div>
          </div>

          <div class="route-arrow">
            <i class="pi pi-arrow-right"></i>
          </div>

          <div class="stop-detail">
            <div class="stop-image-large">
              <img :src="routeData.stops[1].image_url" :alt="routeData.stops[1].name" />
            </div>
            <div class="stop-info">
              <h2 class="stop-name">{{ routeData.stops[1].name }}</h2>
              <p class="stop-address">
                <i class="pi pi-map-marker"></i>
                {{ routeData.stops[1].address }}
              </p>
              <p class="stop-district" v-if="routeData.stops[1].district">
                <i class="pi pi-building"></i>
                {{ routeData.stops[1].district.name }}
              </p>
            </div>
          </div>
        </div>

        <!-- Información de la ruta -->
        <div class="route-info-grid">
          <div class="info-card">
            <i class="pi pi-clock"></i>
            <div>
              <span class="info-label">Duración</span>
              <span class="info-value">{{ routeData.duration }} min</span>
            </div>
          </div>
          <div class="info-card">
            <i class="pi pi-car"></i>
            <div>
              <span class="info-label">Frecuencia</span>
              <span class="info-value">{{ routeData.frequency }} min</span>
            </div>
          </div>
          <div class="info-card">
            <i class="pi pi-dollar"></i>
            <div>
              <span class="info-label">Tarifa</span>
              <span class="info-value">S/ {{ routeData.price }}</span>
            </div>
          </div>
        </div>

        <!-- Horarios de atención -->
        <div class="schedules-section" v-if="routeData.schedules && routeData.schedules.length > 0">
          <h3 class="section-title">
            <i class="pi pi-calendar"></i>
            Horarios de Atención
          </h3>
          <div class="schedules-grid">
            <div
                v-for="schedule in routeData.schedules"
                :key="schedule.dayOfWeek"
                class="schedule-card"
                :class="{ 'disabled': !schedule.enabled }"
            >
              <div class="day-name">{{ schedule.dayOfWeek }}</div>
              <div class="time-range" v-if="schedule.enabled">
                {{ schedule.startTime }} - {{ schedule.endTime }}
              </div>
              <div class="time-range disabled-text" v-else>
                No disponible
              </div>
            </div>
          </div>
        </div>

        <!-- Mensaje si no hay horarios -->
        <div class="schedules-section" v-else>
          <pb-Message severity="info" :closable="false">
            <template #icon>
              <i class="pi pi-info-circle"></i>
            </template>
            No hay horarios registrados para esta ruta
          </pb-Message>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { RouteService } from '@/network/services/route.service.js'
import { useToast } from 'primevue/usetoast'

import { TransportCompanyService } from '@/transport-company/services/transport-company.service.js'

const route = useRoute()
const toast = useToast()
const routeData = ref(null)
const companyName = ref('')
const isLoading = ref(true)
const error = ref(null)

const loadRouteDetail = async () => {
  isLoading.value = true
  error.value = null

  try {
    const routeId = route.params.routeId
    const service = new RouteService()
    routeData.value = await service.getByRouteId(routeId)

    // Load company name
    if (routeData.value && routeData.value.stops && routeData.value.stops[0]) {
      const companyService = new TransportCompanyService()
      const company = await companyService.getCompanyById(routeData.value.stops[0].fk_company_id)
      companyName.value = company.name
    }
  } catch (err) {
    error.value = `Error al cargar detalles de la ruta: ${err.message}`
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: error.value,
      life: 3000
    })
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  loadRouteDetail()
})
</script>

<script>
export default {
  name: 'RouteDetailPage'
}
</script>

<style scoped>
.route-detail-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.detail-header {
  margin-bottom: 2rem;
}

.btn-back {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: #6c5ce7;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-back:hover {
  background: #5945d1;
  transform: translateX(-4px);
}

.btn-back i {
  font-size: 1.1rem;
}

.route-detail-card {
  background: #fff;
  border-radius: 24px;
  box-shadow: 0 8px 32px rgba(80, 89, 168, 0.12);
  padding: 3rem;
}

.company-header {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 1rem 1.5rem;
  background: linear-gradient(135deg, #f5f6fa 0%, #fafbff 100%);
  border-radius: 16px;
  margin-bottom: 2rem;
  font-size: 1.2rem;
  font-weight: 600;
  color: #28287b;
}

.company-header i {
  color: #6058ea;
  font-size: 1.4rem;
}

.stops-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 3rem;
  margin-bottom: 3rem;
  padding-bottom: 3rem;
  border-bottom: 2px solid #f0f0f5;
}

.stop-detail {
  flex: 1;
  display: flex;
  gap: 1.5rem;
  align-items: center;
}

.stop-image-large {
  width: 140px;
  height: 140px;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(80, 89, 168, 0.15);
  flex-shrink: 0;
}

.stop-image-large img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.stop-info {
  flex: 1;
}

.stop-name {
  font-size: 1.8rem;
  font-weight: 700;
  color: #28287b;
  margin-bottom: 0.5rem;
}

.stop-address {
  font-size: 1.1rem;
  color: #7878a3;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.stop-address i {
  color: #6058ea;
}

.stop-district {
  font-size: 1rem;
  color: #6058ea;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
}

.stop-district i {
  font-size: 0.9rem;
}

.route-arrow {
  font-size: 3rem;
  color: #8b8bbe;
  flex-shrink: 0;
}

.route-info-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-bottom: 3rem;
}

.info-card {
  background: linear-gradient(135deg, #f5f6fa 0%, #fafbff 100%);
  border-radius: 16px;
  padding: 2rem;
  display: flex;
  align-items: center;
  gap: 1.2rem;
  transition: transform 0.2s, box-shadow 0.2s;
}

.info-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(96, 88, 234, 0.15);
}

.info-card i {
  font-size: 2.5rem;
  color: #6058ea;
}

.info-label {
  display: block;
  font-size: 1rem;
  color: #8a8aad;
  margin-bottom: 0.3rem;
}

.info-value {
  display: block;
  font-weight: 700;
  font-size: 1.6rem;
  color: #232360;
}

.schedules-section {
  margin-top: 3rem;
}

.section-title {
  font-size: 1.6rem;
  font-weight: 700;
  color: #28287b;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

.section-title i {
  color: #6058ea;
  font-size: 1.8rem;
}

.schedules-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
}

.schedule-card {
  background: linear-gradient(135deg, #6058ea 0%, #7c75ff 100%);
  color: white;
  padding: 1.5rem;
  border-radius: 14px;
  text-align: center;
  transition: transform 0.2s;
}

.schedule-card:hover {
  transform: scale(1.05);
}

.schedule-card.disabled {
  background: linear-gradient(135deg, #e0e0e8 0%, #f0f0f5 100%);
  color: #8a8aad;
}

.day-name {
  font-weight: 700;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
}

.time-range {
  font-size: 0.95rem;
  font-weight: 500;
}

.disabled-text {
  opacity: 0.7;
}

@media (max-width: 992px) {
  .stops-section {
    flex-direction: column;
    gap: 2rem;
  }

  .route-arrow {
    transform: rotate(90deg);
  }

  .route-info-grid {
    grid-template-columns: 1fr;
  }

  .schedules-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .route-detail-page {
    padding: 1rem;
  }

  .route-detail-card {
    padding: 1.5rem;
  }

  .stop-detail {
    flex-direction: column;
    text-align: center;
  }

  .schedules-grid {
    grid-template-columns: 1fr;
  }
}
</style>
