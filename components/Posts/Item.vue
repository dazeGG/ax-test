<script setup lang="ts">
import type { IPost } from "~/typing/IPost";

const props = defineProps<{
  post: IPost;
}>();
</script>

<template>
  <div class="post">
    <p class="post__title">{{ props.post.title }}</p>
    <p class="post__body">{{ props.post.body }}</p>
  </div>
</template>

<style scoped lang="scss">
.post {
  border: 1px solid var(--text-color);
  border-radius: 1rem;
  padding: 1rem;

  &__title {
    font-size: 1.25rem;
    font-weight: 500;
    margin-bottom: 1rem;
  }

  &__body {
    font-size: 0.75rem;
  }
}
</style>
