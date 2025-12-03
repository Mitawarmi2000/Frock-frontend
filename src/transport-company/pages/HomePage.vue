<script setup>
import { ref, onMounted } from 'vue';
import KPICard from "@/transport-company/components/KPICard.vue";
import {CurrencyDollarIcon} from "@heroicons/vue/24/solid/index.js";
import {MapPinIcon} from "@heroicons/vue/24/solid/index.js";
import {StopCircleIcon} from "@heroicons/vue/24/solid/index.js";
import {ClockIcon} from "@heroicons/vue/24/solid/index.js";
import CompanyInfoCard from "@/transport-company/components/CompanyEditCard.vue";
import SubscriptionsPrototype from "@/shared/components/Suscription.vue";
import {TransportCompanyService} from "@/transport-company/services/transport-company.service.js";
import {RouteService} from "@/network/services/route.service.js";
import {StopService} from "@/network/services/stop.service.js";

const companyName = ref('Usuario');
const isLoadingKPIs = ref(true);

// KPIs dinámicos
const kpis = ref({
  averagePrice: 'S/ 0.00',
  totalStops: 0,
  totalRoutes: 0,
  averageFrequency: '0 min'
});

onMounted(async () => {
  await loadCompanyData();
  await loadKPIs();
});

async function loadCompanyData() {
  try {
    const userData = JSON.parse(localStorage.getItem('user'));

    if (userData && userData.companyId) {
      const transportCompanyService = new TransportCompanyService();
      const company = await transportCompanyService.getCompanyById(userData.companyId);

      if (company && company.name) {
        companyName.value = company.name;
      }
    }
  } catch (error) {
    console.error('Error al obtener información de la empresa:', error);
  }
}

async function loadKPIs() {
  isLoadingKPIs.value = true;

  try {
    const userData = JSON.parse(localStorage.getItem('user'));

    if (!userData || !userData.companyId) {
      console.warn('No se encontró companyId en localStorage');
      return;
    }

    const companyId = userData.companyId;
    const routeService = new RouteService();
    const stopService = new StopService();

    // Obtener rutas y paraderos en paralelo
    const [routes, stops] = await Promise.all([
      routeService.loadRoutesByCompanyId(companyId),
      stopService.getStopsByCompanyId(companyId)
    ]);

    // Calcular KPIs
    calculateKPIs(routes, stops);

  } catch (error) {
    console.error('Error al cargar KPIs:', error);
    // Mantener valores por defecto en caso de error
  } finally {
    isLoadingKPIs.value = false;
  }
}

function calculateKPIs(routes, stops) {
  // Total de paraderos
  kpis.value.totalStops = stops.length;

  // Total de rutas
  kpis.value.totalRoutes = routes.length;

  if (routes.length > 0) {
    // Calcular tarifa promedio
    const totalPrice = routes.reduce((sum, route) => sum + (route.price || 0), 0);
    const averagePrice = totalPrice / routes.length;
    kpis.value.averagePrice = `S/ ${averagePrice.toFixed(2)}`;

    // Calcular frecuencia promedio (intervalo)
    const totalFrequency = routes.reduce((sum, route) => sum + (route.frequency || 0), 0);
    const averageFrequency = Math.round(totalFrequency / routes.length);
    kpis.value.averageFrequency = `${averageFrequency} min`;
  } else {
    kpis.value.averagePrice = 'S/ 0.00';
    kpis.value.averageFrequency = '0 min';
  }
}
</script>

<template>
  <div class="home-page-header">
    <h1>¡{{ companyName }}, te damos la bienvenida!</h1>
  </div>

  <section class="kpi-container">
    <h2>Resumen General</h2>

    <!-- Loading state -->
    <div v-if="isLoadingKPIs" class="kpi-loading">
      <div class="spinner"></div>
      <p>Cargando estadísticas...</p>
    </div>

    <!-- KPIs -->
    <div v-else class="kpi-grid">
      <KPICard
          :icon="CurrencyDollarIcon"
          :value="kpis.averagePrice"
          label="Tarifa promedio"
          color="#7A78FF"
      />
      <KPICard
          :icon="MapPinIcon"
          :value="kpis.totalStops"
          label="Total de paraderos"
          color="#00A652"
      />
      <KPICard
          :icon="StopCircleIcon"
          :value="kpis.totalRoutes"
          label="Total de rutas"
          color="#478BFF"
      />
      <KPICard
          :icon="ClockIcon"
          :value="kpis.averageFrequency"
          label="Intervalo promedio"
          color="#FF2C2C"
      />
    </div>
  </section>

  <section class="kpi-container">
    <SubscriptionsPrototype/>
  </section>

  <section class="company-info-container">
    <CompanyInfoCard />
  </section>
</template>

<style scoped>
.home-page-header h1{
  font-size: 2.5rem;
  color: var(--color-slate-300);
}

.kpi-container{
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 3rem;
}

.kpi-container h2{
  font-size: 2rem;
  font-weight: 600;
  color: var(--color-primary);
}

.kpi-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  gap: 1rem;
  color: #636e72;
}

.spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #7A78FF;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.kpi-grid {
  display: grid;
  grid-template-columns: repeat(4,1fr);
  gap: 1rem;
}

.button-edit-stops h2{
  font-size: 1.75rem;
  font-weight: 600;
}

.button-edit-stops button{
  display: flex;
  background-color: white;
  border: none;
  cursor: pointer;
  align-items: center;
  gap: 0.5rem;
}

.button-edit-stops .icon{
  width: 1rem;
}

.company-info-container{
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 3rem;
}

@media (max-width: 1200px) {
  .kpi-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .kpi-grid {
    grid-template-columns: 1fr;
  }

  .home-page-header h1 {
    font-size: 1.8rem;
  }
}
</style>