<script>
import { useRouter } from 'vue-router'

export default {
  name: "route-alpha-card",
  props: ['route', 'companyName'],

  setup(props) {
    const router = useRouter()

    const goToDetail = () => {
      router.push(`/routes/${props.route.id}`)
    }

    return {
      goToDetail
    }
  }
}
</script>

<template>
  <pb-Card class="route-alpha-card" @click="goToDetail">
    <template #header>
      <div class="image-container">
        <img :src="route.stops[0].image_url || 'https://picsum.photos/300/360'" :alt="route.stops[0].name">
      </div>
    </template>

    <template #content>
      <div class="card-content-inner">
        <div class="stops-name-container">
          <p>{{ route.stops[0].name }} - {{ route.stops[1].name }}</p>
        </div>

        <div class="company-container">
          <p>{{ companyName }}</p>
        </div>

        <div class="district-container" v-if="route.stops && route.stops[0] && route.stops[0].district">
          <i class="pi pi-map-marker"></i>
          <p>{{ route.stops[0].district.name }}</p>
        </div>

        <div class="route-details-container">
          <div class="duration-container">
            <div class="icon-label-row">
              <i class="pi pi-clock" style="font-size: 1rem"></i>
              <span class="label">Duración</span>
            </div>
            <p>{{ route.duration }} min</p>
          </div>

          <div class="fee-container">
            <div class="icon-label-row">
              <i class="pi pi-money-bill" style="font-size: 1rem"></i>
              <span class="label">Tarifa</span>
            </div>
            <p>S/{{ route.price }}</p>
          </div>
        </div>
      </div>
    </template>

    <!-- Indicador visual de que es clicable -->
    <div class="click-overlay">
      <i class="pi pi-eye"></i>
      <span>Ver detalles</span>
    </div>
  </pb-Card>
</template>

<style scoped>
.route-alpha-card {
  width: 300px;
  height: 360px;
  display: flex;
  flex-direction: column;
  border: #CCCCFF 1px solid;
  overflow: hidden;
  filter: drop-shadow(1px 4px 1px rgba(0, 0, 0, 0.1));
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;

  --p-card-body-padding: 0px;
  --p-card-body-gap: 0px;
}

.route-alpha-card:hover {
  transform: translateY(-8px);
  filter: drop-shadow(2px 8px 12px rgba(0, 0, 0, 0.2));
  border-color: #6058ea;
}

.image-container {
  width: 100%;
  height: 220px;
  object-fit: cover;
  overflow: hidden;
  position: relative;
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.route-alpha-card:hover .image-container img {
  transform: scale(1.1);
}

.card-content-inner {
  display: flex;
  flex-direction: column;
  padding: 15px 20px;
  gap: 5px;
}

.stops-name-container {
  color: var(--color-primary);
  font-weight: bold;
  font-size: 17px;
}

.company-container {
  color: #484848;
  font-size: 16px;
}

.district-container {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #6c5ce7;
  font-size: 14px;
  font-weight: 500;
  margin-top: 2px;
}

.district-container i {
  font-size: 12px;
}

.route-details-container {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #484848;
  font-size: 14px;
}

.route-details-container p {
  font-weight: bold;
}

.route-details-container i {
  font-weight: bold;
}

.duration-container,
.fee-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
}

.icon-label-row {
  display: flex;
  align-items: center;
  gap: 6px;
  justify-content: center;
  margin-bottom: 4px;
}

/* Overlay que aparece al hacer hover */
.click-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(96, 88, 234, 0.95);
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  opacity: 0;
  transition: opacity 0.3s ease;
  font-size: 1.1rem;
  font-weight: 600;
}

.click-overlay i {
  font-size: 2.5rem;
}

.route-alpha-card:hover .click-overlay {
  opacity: 1;
}

@media (max-width: 640px) {
  .route-alpha-card {
    width: 100%;
    max-width: 300px;
  }
}
</style>