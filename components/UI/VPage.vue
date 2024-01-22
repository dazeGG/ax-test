<script setup lang="ts">
const props = defineProps<{
  title?: string;
}>();
</script>

<template>
  <div class="page">
    <div class="page__header">
      <h1 class="page__title" v-text="props.title" />
      <slot name="header-right" />
    </div>
    <slot />
  </div>
</template>

<style scoped lang="scss">
.page {
  max-width: 40rem;
  margin: 0 auto;

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__title {
    font-size: 2.5rem;
    font-weight: 900;
  }
}
</style>
