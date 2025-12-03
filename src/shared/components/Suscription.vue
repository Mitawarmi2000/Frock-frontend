<template>
  <div class="subscriptions-page">
    <h1 class="title">Elige tu plan</h1>
    <p class="subtitle">Suscripciones para tu empresa de transporte</p>

    <div class="plans">
      <div class="plan-card free">
        <div class="plan-header">
          <h2>Free</h2>
          <div class="plan-badge">Gratis</div>
        </div>
        <p class="price">$0</p>
        <p class="detail">1 mes gratis, ideal para probar la plataforma.</p>
        <ul class="features">
          <li>✓ 1 empresa</li>
          <li>✓ Hasta 2 rutas</li>
          <li>✓ Soporte por email</li>
        </ul>
        <a
            class="pay-button free-btn"
            href="https://www.sandbox.paypal.com"
            target="_blank"
            rel="noopener"
        >
          Empezar gratis
        </a>
      </div>

      <div class="plan-card standard">
        <div class="plan-header">
          <h2>Standard</h2>
          <div class="plan-badge popular">Popular</div>
        </div>
        <p class="price">$29 <span class="period">/ 6 meses</span></p>
        <p class="detail">Para empresas en crecimiento.</p>
        <ul class="features">
          <li>✓ Hasta 3 empresas</li>
          <li>✓ Rutas y paraderos ilimitados</li>
          <li>✓ Soporte por email</li>
        </ul>
        <a
            class="pay-button standard-btn"
            href="https://www.sandbox.paypal.com"
            target="_blank"
            rel="noopener"
        >
          Pagar con PayPal
        </a>
      </div>

      <div class="plan-card premium">
        <div class="plan-header">
          <h2>Premium</h2>
          <div class="plan-badge pro">Pro</div>
        </div>
        <p class="price">$59 <span class="period">/ año</span></p>
        <p class="detail">Para operaciones avanzadas.</p>
        <ul class="features">
          <li>✓ Empresas ilimitadas</li>
          <li>✓ Rutas avanzadas y monitoreo</li>
          <li>✓ Soporte prioritario</li>
        </ul>
        <a
            class="pay-button premium-btn"
            href="https://www.sandbox.paypal.com"
            target="_blank"
            rel="noopener"
        >
          Pagar con PayPal
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SubscriptionsPrototype",
};
</script>

<style scoped>
.subscriptions-page {
  min-height: 70vh;
  padding: 2rem 1rem;
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  color: #2d3436;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Poppins', system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  border-radius: 20px;
}

.title {
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: #2d3436;
}

.subtitle {
  color: #636e72;
  margin-bottom: 2.5rem;
  font-size: 1rem;
}

.plans {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  width: 100%;
  max-width: 1000px;
}

.plan-card {
  border-radius: 16px;
  padding: 2rem 1.75rem;
  background: white;
  border: 2px solid #e9ecef;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.plan-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #CCCCff, #3FA4A9);
}

.plan-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  border-color: #3FA4A9;
}

.plan-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.plan-card h2 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #2d3436;
  margin: 0;
}

.plan-badge {
  padding: 0.35rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  background: #e9ecef;
  color: #636e72;
}

.plan-badge.popular {
  background: linear-gradient(135deg, #CCCCff, #7A78FF);
  color: white;
}

.plan-badge.pro {
  background: linear-gradient(135deg, #3FA4A9, #2d7a7e);
  color: white;
}

.price {
  font-size: 2.5rem;
  font-weight: 700;
  margin: 1rem 0 0.5rem;
  color: #2d3436;
}

.period {
  font-size: 1rem;
  font-weight: 400;
  color: #636e72;
}

.detail {
  font-size: 0.95rem;
  color: #636e72;
  margin-bottom: 1.5rem;
  line-height: 1.5;
}

.features {
  list-style: none;
  padding: 0;
  margin: 0 0 2rem;
  font-size: 0.95rem;
  color: #2d3436;
}

.features li {
  padding: 0.5rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.features li::before {
  font-size: 1.1rem;
  color: #3FA4A9;
}

.pay-button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 0.9rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  text-decoration: none;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
}

.free-btn {
  background: linear-gradient(135deg, #e9ecef, #dfe6e9);
  color: #2d3436;
}

.free-btn:hover {
  background: linear-gradient(135deg, #dfe6e9, #b2bec3);
  transform: scale(1.02);
}

.standard-btn {
  background: linear-gradient(135deg, #CCCCff, #7A78FF);
  color: white;
  box-shadow: 0 4px 15px rgba(122, 120, 255, 0.3);
}

.standard-btn:hover {
  background: linear-gradient(135deg, #7A78FF, #5B57D1);
  box-shadow: 0 6px 20px rgba(122, 120, 255, 0.4);
  transform: scale(1.02);
}

.premium-btn {
  background: linear-gradient(135deg, #3FA4A9, #2d7a7e);
  color: white;
  box-shadow: 0 4px 15px rgba(63, 164, 169, 0.3);
}

.premium-btn:hover {
  background: linear-gradient(135deg, #2d7a7e, #1f5d61);
  box-shadow: 0 6px 20px rgba(63, 164, 169, 0.4);
  transform: scale(1.02);
}

/* Estilos específicos por plan */
.free {
  border-color: #dfe6e9;
}

.free:hover {
  border-color: #b2bec3;
}

.free::before {
  background: linear-gradient(90deg, #dfe6e9, #b2bec3);
}

.standard {
  border-color: #CCCCff;
}

.standard:hover {
  border-color: #7A78FF;
}

.standard::before {
  background: linear-gradient(90deg, #CCCCff, #7A78FF);
}

.premium {
  border-color: #3FA4A9;
}

.premium:hover {
  border-color: #2d7a7e;
}

.premium::before {
  background: linear-gradient(90deg, #3FA4A9, #2d7a7e);
}

@media (max-width: 768px) {
  .plans {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .title {
    font-size: 1.8rem;
  }

  .price {
    font-size: 2rem;
  }
}
</style>