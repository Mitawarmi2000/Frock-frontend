<template>
  <div class="subscriptions-page">
    <h1 class="title">Elige tu plan</h1>
    <p class="subtitle">Suscripciones para tu empresa de transporte</p>

    <div class="plans">
      <div class="plan-card free">
        <h2>Free</h2>
        <p class="price">$0</p>
        <p class="detail">1 mes gratis, ideal para probar la plataforma.</p>
        <ul class="features">
          <li>1 empresa</li>
          <li>Hasta 2 rutas</li>
          <li>Soporte por email</li>
        </ul>
        <a
            class="pay-button"
            href="https://www.sandbox.paypal.com"
            target="_blank"
            rel="noopener"
        >
          Empezar gratis
        </a>
      </div>

      <div class="plan-card standard">
        <h2>Standard</h2>
        <p class="price">$29 / 6 meses</p>
        <p class="detail">Para empresas en crecimiento.</p>
        <ul class="features">
          <li>Hasta 3 empresas</li>
          <li>Rutas y paraderos ilimitados</li>
          <li>Soporte por email</li>
        </ul>
        <a
            class="pay-button"
            href="https://www.sandbox.paypal.com"
            target="_blank"
            rel="noopener"
        >
          Pagar con PayPal
        </a>
      </div>

      <div class="plan-card premium">
        <h2>Premium</h2>
        <p class="price">$59 / año</p>
        <p class="detail">Para operaciones avanzadas.</p>
        <ul class="features">
          <li>Empresas ilimitadas</li>
          <li>Rutas avanzadas y monitoreo</li>
          <li>Soporte prioritario</li>
        </ul>
        <a
            class="pay-button"
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
  padding: 1rem;
  background: radial-gradient(circle at top, #ffffff 0, #ffffff 55%);
  color: #212121;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
  sans-serif;
  border-radius: 20px;
}

.title {
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
}

.subtitle {
  color: #9ca3af;
  margin-bottom: 2.5rem;
}

.plans {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
  width: 100%;
  max-width: 960px;
}

.plan-card {
  border-radius: 1rem;
  padding: 1.75rem 1.5rem;
  background: rgb(122, 121, 121);
  border: 1px solid rgba(148, 163, 184, 0.35);
  box-shadow: 0 20px 40px rgba(15, 23, 42, 0.7);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 150ms ease, box-shadow 150ms ease,
  border-color 150ms ease;
  border-radius: 20px;
}

.plan-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 26px 60px rgba(15, 23, 42, 0.95);
  border-color: #38bdf8;
}

.plan-card h2 {
  font-size: 1.4rem;
  margin-bottom: 0.25rem;
}

.price {
  font-size: 1.6rem;
  font-weight: 700;
  margin: 0.5rem 0 0.75rem;
}

.detail {
  font-size: 0.9rem;
  color: #d1d5db;
  margin-bottom: 1rem;
}

.features {
  list-style: none;
  padding: 0;
  margin: 0 0 1.5rem;
  font-size: 0.88rem;
  color: #e5e7eb;
}

.features li + li {
  margin-top: 0.35rem;
}

.pay-button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 0.65rem 1rem;
  border-radius: 999px;
  font-weight: 600;
  font-size: 0.95rem;
  text-decoration: none;
  color: #0f172a;
  background: linear-gradient(135deg, #fbbf24, #facc15);
  box-shadow: 0 10px 30px rgba(252, 211, 77, 0.35);
  transition: transform 100ms ease, box-shadow 100ms ease, filter 100ms ease;
}

/* Colores sutiles por plan */
.free {
  border-color: rgba(96, 165, 250, 0.6);
}

.standard {
  border-color: rgba(52, 211, 153, 0.6);
}

.premium {
  border-color: rgba(251, 191, 36, 0.8);
}
</style>
