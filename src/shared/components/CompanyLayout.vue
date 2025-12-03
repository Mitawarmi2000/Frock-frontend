<script>
import companyToolbar from "@/shared/components/company-toolbar/toolbar-company.component.vue";

export default {
  components: {
    companyToolbar,
  }
}
</script>

<template>
  <company-toolbar/>
  <main class="page-container">
    <div class="container">
      <router-view />
    </div>
  </main>
</template>

<style scoped>
.page-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}

.container{
  /*Flex*/
  display: flex;
  flex-direction: column;

  /*Margins*/
  margin-top: 1%;

  /*Fixed Width*/
  max-width: 1250px;
  width: 100%;

  padding: 35px 0.5vw;

  /**/
  gap: 40px
}
</style>