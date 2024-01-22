<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    title?: string;
    hasBackButton?: boolean;
  }>(),
  {
    title: "",
    hasBackButton: false,
  },
);

const back = () => history.back();
</script>

<template>
  <div class="page">
    <button v-if="hasBackButton" class="page__back-button" @click="back">
      <i class="pi pi-arrow-left" />
    </button>
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

  &__back-button {
    position: fixed;
    top: 0;
    left: 0;
    width: calc((100vw - 40rem) / 2 - 2rem);
    height: 100vh;
    cursor: pointer;
    opacity: 0;
    transition: opacity 100ms ease-in-out;
    background: linear-gradient(90deg, #222222 0%, rgb(0, 0, 0, 0) 100%);
    border: none;

    &:hover {
      opacity: 1;
    }
  }

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
