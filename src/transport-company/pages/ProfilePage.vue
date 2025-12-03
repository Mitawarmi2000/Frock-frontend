<template>
  <div class="profile-container">
    <div class="profile-header">
      <h1>Mi Perfil</h1>
      <p class="subtitle">Información de tu cuenta</p>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="loading-container">
      <div class="spinner"></div>
      <p>Cargando información...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="error-container">
      <div class="error-icon">⚠️</div>
      <p>{{ error }}</p>
      <button @click="loadUserData" class="btn-retry">Reintentar</button>
    </div>

    <!-- Profile Content -->
    <div v-else class="profile-content">
      <div class="profile-grid">
        <!-- User Info Card -->
        <div class="profile-card">
          <div class="card-header">
            <div class="avatar">
              {{ getInitials(userData.username) }}
            </div>
            <div class="user-basic-info">
              <h2>{{ userData.username }}</h2>
              <span class="role-badge" :class="getRoleBadgeClass(userData.role)">
                {{ getRoleBadgeText(userData.role) }}
              </span>
            </div>
          </div>

          <div class="card-body">
            <div class="info-row">
              <div class="info-label">
                <i class="pi pi-user"></i>
                <span>Nombre de usuario</span>
              </div>
              <div class="info-value">{{ userData.username }}</div>
            </div>

            <div class="info-row">
              <div class="info-label">
                <i class="pi pi-briefcase"></i>
                <span>Tipo de cuenta</span>
              </div>
              <div class="info-value">{{ getRoleLabel(userData.role) }}</div>
            </div>

            <div class="info-row">
              <div class="info-label">
                <i class="pi pi-calendar"></i>
                <span>Fecha de registro</span>
              </div>
              <div class="info-value">{{ formatDate(userData.createdAt) }}</div>
            </div>
          </div>
        </div>

        <!-- Company Info Card (Only for Transport Manager) -->
        <div v-if="userData.role === 1 && companyData" class="profile-card company-card">
          <div class="card-header">
            <h3>
              <i class="pi pi-building"></i>
              Información de la Empresa
            </h3>
          </div>

          <div class="card-body company-body">
            <div class="company-info-centered">
              <div class="company-logo-container">
                <img
                    v-if="companyData.logoUrl"
                    :src="companyData.logoUrl"
                    :alt="companyData.name"
                    class="company-logo"
                />
                <div v-else class="company-logo-placeholder">
                  <i class="pi pi-image"></i>
                </div>
              </div>
              <div class="company-details">
                <h4>{{ companyData.name }}</h4>
                <p class="company-id">ID: {{ companyData.id }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Actions Card -->
      <div class="profile-card actions-card">
        <div class="card-header">
          <h3>
            <i class="pi pi-cog"></i>
            Acciones
          </h3>
        </div>
        <div class="card-body">
          <button class="action-btn btn-home" @click="goToHome">
            <i class="pi pi-home"></i>
            <span>Volver al inicio</span>
          </button>
          <button class="action-btn btn-logout" @click="handleLogout">
            <i class="pi pi-sign-out"></i>
            <span>Cerrar sesión</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { UserService } from '@/access-and-identity/services/user.service.js';
import { TransportCompanyService } from '@/transport-company/services/transport-company.service.js';
import { APP_ROUTES } from '@/shared/services/routes.js';

const router = useRouter();

const userData = ref({
  id: null,
  username: '',
  role: null,
  createdAt: null
});

const companyData = ref(null);
const isLoading = ref(true);
const error = ref(null);

onMounted(async () => {
  await loadUserData();
});

async function loadUserData() {
  isLoading.value = true;
  error.value = null;

  try {
    // Obtener datos básicos del localStorage
    const localUser = JSON.parse(localStorage.getItem('user'));

    if (!localUser || !localUser.id) {
      throw new Error('No se encontró información del usuario');
    }

    // Obtener datos completos del usuario desde el backend
    const userService = new UserService();
    const userDetails = await userService.getUserById(localUser.id);

    userData.value = {
      id: userDetails.id,
      username: userDetails.username,
      role: userDetails.role,
      createdAt: userDetails.createdAt || new Date().toISOString()
    };

    // Si es TransportManager, obtener datos de la empresa
    if (userDetails.role === 1 && localUser.companyId) {
      const transportCompanyService = new TransportCompanyService();
      const company = await transportCompanyService.getCompanyById(localUser.companyId);
      companyData.value = company;
    }

  } catch (err) {
    console.error('Error al cargar datos del usuario:', err);
    error.value = err.message || 'Error al cargar la información del perfil';
  } finally {
    isLoading.value = false;
  }
}

function getInitials(name) {
  if (!name) return 'U';
  const names = name.trim().split(' ');
  if (names.length >= 2) {
    return `${names[0][0]}${names[1][0]}`.toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
}

function getRoleLabel(role) {
  return role === 0 ? 'Pasajero' : 'Administrador de Transporte';
}

function getRoleBadgeText(role) {
  return role === 0 ? 'Pasajero' : 'Admin. Transporte';
}

function getRoleBadgeClass(role) {
  return role === 0 ? 'role-passenger' : 'role-manager';
}

function formatDate(dateString) {
  if (!dateString) return 'No disponible';
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

function goToHome() {
  router.push('/company/home');
}

function handleLogout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  router.push(`/${APP_ROUTES.AUTH.ROOT}/${APP_ROUTES.AUTH.LOGIN}`);
}
</script>

<style scoped>
.profile-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
}

.profile-header {
  margin-bottom: 2rem;
}

.profile-header h1 {
  font-size: 2.5rem;
  color: #2d3436;
  margin-bottom: 0.5rem;
}

.subtitle {
  color: #636e72;
  font-size: 1rem;
}

/* Loading State */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 0;
  color: #636e72;
}

.spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3FA4A9;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Error State */
.error-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  background: #ffe8e8;
  border-radius: 12px;
  color: #d63031;
}

.error-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.btn-retry {
  margin-top: 1rem;
  padding: 0.75rem 1.5rem;
  background: #d63031;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.3s ease;
}

.btn-retry:hover {
  background: #c0392b;
}

/* Profile Content */
.profile-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.profile-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

@media (max-width: 1200px) {
  .profile-grid {
    grid-template-columns: 1fr;
  }
}

.profile-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.profile-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12);
}

.card-header {
  padding: 2rem;
  background: linear-gradient(135deg, #CCCCff 0%, #3FA4A9 100%);
  color: white;
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: white;
  color: #3FA4A9;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: bold;
  flex-shrink: 0;
}

.user-basic-info {
  flex: 1;
}

.user-basic-info h2 {
  margin: 0 0 0.5rem 0;
  font-size: 1.75rem;
}

.role-badge {
  display: inline-block;
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  white-space: nowrap;
}

.role-passenger {
  background: rgba(255, 255, 255, 0.3);
  color: white;
}

.role-manager {
  background: rgba(255, 255, 255, 0.3);
  color: white;
}

.card-body {
  padding: 2rem;
}

.info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid #f0f0f0;
}

.info-row:last-child {
  border-bottom: none;
}

.info-label {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #636e72;
  font-weight: 500;
}

.info-label i {
  color: #3FA4A9;
  font-size: 1.25rem;
}

.info-value {
  color: #2d3436;
  font-weight: 600;
}

/* Company Card */
.company-card .card-header {
  background: linear-gradient(135deg, #3FA4A9 0%, #2d7a7e 100%);
}

.company-card .card-header h3 {
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.5rem;
}

.company-body {
  padding: 0 !important;
}

.company-info-centered {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  text-align: center;
  gap: 1.5rem;
}

.company-logo-container {
  width: 120px;
  height: 120px;
  border-radius: 12px;
  overflow: hidden;
  border: 2px solid #e9ecef;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8f9fa;
  flex-shrink: 0;
}

.company-logo {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.company-logo-placeholder {
  font-size: 3rem;
  color: #adb5bd;
}

.company-details h4 {
  margin: 0 0 0.5rem 0;
  font-size: 1.5rem;
  color: #2d3436;
}

.company-id {
  color: #636e72;
  font-size: 0.875rem;
  margin: 0;
}

/* Actions Card */
.actions-card .card-header {
  background: linear-gradient(135deg, #636e72 0%, #2d3436 100%);
}

.actions-card .card-header h3 {
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.5rem;
}

.actions-card .card-body {
  display: flex;
  gap: 1rem;
}

.action-btn {
  flex: 1;
  padding: 1rem;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  transition: all 0.3s ease;
}

.btn-home {
  background: #3FA4A9;
}

.btn-home:hover {
  background: #2d7a7e;
  transform: scale(1.02);
}

.btn-logout {
  background: #d63031;
}

.btn-logout:hover {
  background: #c0392b;
  transform: scale(1.02);
}

.action-btn:active {
  transform: scale(0.98);
}

.action-btn i {
  font-size: 1.25rem;
}

/* Responsive */
@media (max-width: 768px) {
  .profile-container {
    padding: 1rem;
  }

  .profile-header h1 {
    font-size: 2rem;
  }

  .profile-grid {
    grid-template-columns: 1fr;
  }

  .card-header {
    flex-direction: column;
    text-align: center;
  }

  .avatar {
    width: 60px;
    height: 60px;
    font-size: 1.5rem;
  }

  .company-logo-section {
    flex-direction: column;
    text-align: center;
  }

  .actions-card .card-body {
    flex-direction: column;
  }

  .info-row {
    flex-direction: column;
    gap: 0.5rem;
    align-items: flex-start;
  }
}
</style>