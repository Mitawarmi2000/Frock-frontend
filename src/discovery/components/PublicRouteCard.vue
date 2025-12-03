<template>
  <div class="route-card-clickable" @click="goToDetail">
    <!-- Imágenes grandes, al inicio y al final -->
    <div class="stop-image-large">
      <img :src="route.stops[0].image_url" alt="Origen" />
    </div>

    <div class="route-info-section">
      <div class="route-stops-names">
        <div>
          <div class="stop-name">{{ route.stops[0].name }}</div>
          <div class="stop-address">{{ route.stops[0].address }}</div>
        </div>
        <div class="swap-icon-center">
          <i class="pi pi-arrows-h" />
        </div>
        <div>
          <div class="stop-name">{{ route.stops[1].name }}</div>
          <div class="stop-address">{{ route.stops[1].address }}</div>
        </div>
      </div>

      <div class="route-info-row">
        <div class="info-block">
          <i class="pi pi-clock info-icon" />
          <div>
            <span class="info-label">Duración</span>
            <span class="info-value">{{ route.duration }} min</span>
          </div>
        </div>
        <div class="info-block">
          <i class="pi pi-car info-icon" />
          <div>
            <span class="info-label">Frecuencia</span>
            <span class="info-value">{{ route.frequency }} min</span>
          </div>
        </div>
        <div class="info-block">
          <i class="pi pi-dollar info-icon" />
          <div>
            <span class="info-label">Tarifa</span>
            <span class="info-value">S/ {{ route.price }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="stop-image-large">
      <img :src="route.stops[1].image_url" alt="Destino" />
    </div>

    <!-- Indicador de click -->
    <div class="click-indicator">
      <i class="pi pi-chevron-right"></i>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const props = defineProps({
  route: {
    type: Object,
    required: true
  }
})

const router = useRouter()

const goToDetail = () => {
  router.push(`/routes/${props.route.id}`)
}
</script>

<script>
export default {
  name: 'PublicRouteCard'
}
</script>

<style scoped>
.route-card-clickable {
  width: 100%;
  margin: 16px auto;
  background: #fff;
  border-radius: 22px;
  box-shadow: 0 8px 32px rgba(80, 89, 168, 0.09), 0 1.5px 4px #e5e5f7;
  display: flex;
  align-items: center;
  gap: 2rem;
  padding: 1.5rem 2rem;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
}

.route-card-clickable:hover {
  box-shadow: 0 16px 48px rgba(80, 89, 168, 0.2), 0 3px 10px #e5e5f7;
  transform: translateY(-4px);
}

.route-card-clickable:active {
  transform: translateY(-2px);
}

.stop-image-large {
  width: 110px;
  height: 110px;
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(80,89,168,0.10);
  background: #f5f6fa;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.stop-image-large img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.route-info-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
}

.route-stops-names {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 8px;
}

.swap-icon-center {
  color: #8b8bbe;
  margin: 0 14px;
}

.swap-icon-center i {
  font-size: 34px;
}

.stop-name {
  font-weight: 700;
  font-size: 1.18rem;
  color: #28287b;
  margin-bottom: 3px;
}

.stop-address {
  font-size: 0.98rem;
  color: #7878a3;
  font-weight: 400;
}

.route-info-row {
  display: flex;
  gap: 26px;
}

.info-block {
  background: #f5f6fa;
  border-radius: 12px;
  padding: 0.9rem 1.2rem;
  flex: 1 1 0;
  display: flex;
  align-items: center;
  gap: 0.7rem;
  min-width: 110px;
}

.info-icon {
  font-size: 25px;
  color: #6058ea;
}

.info-label {
  display: block;
  font-size: 0.93rem;
  color: #8a8aad;
}

.info-value {
  display: block;
  font-weight: 600;
  font-size: 1.10rem;
  color: #232360;
  margin-top: -2px;
}

.click-indicator {
  color: #6058ea;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: #f5f6fa;
  border-radius: 50%;
  transition: all 0.3s;
}

.route-card-clickable:hover .click-indicator {
  background: #6058ea;
  color: white;
  transform: translateX(4px);
}

@media (max-width: 992px) {
  .route-card-clickable {
    flex-wrap: wrap;
    gap: 1.5rem;
  }

  .route-info-row {
    flex-direction: column;
    gap: 0.8rem;
  }

  .click-indicator {
    position: absolute;
    top: 1rem;
    right: 1rem;
  }
}
</style>