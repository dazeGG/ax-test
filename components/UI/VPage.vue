<script setup lang="ts">
const props = defineProps<{
  title?: string;
}>();
</script>

<template>
  <div class="page">
    <h1 class="page__title" v-text="props.title" />
    <slot />
  </div>
</template>

<style scoped lang="scss">
.page {
  max-width: 40rem;
  margin: 0 auto;

  &__title {
    font-size: 2.5rem;
    font-weight: 900;
  }
}
</style>
