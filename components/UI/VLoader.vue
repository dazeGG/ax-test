<script setup lang="ts">
import ProgressSpinner from "primevue/progressspinner";
</script>

<template>
  <div class="loader">
    <ProgressSpinner />
  </div>
</template>

<style scoped lang="scss">
.loader {
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
