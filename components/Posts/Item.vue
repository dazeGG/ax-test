<script setup lang="ts">
import type { IPost } from "~/typing/IPost";

const props = defineProps<{
  post: IPost;
}>();
</script>

<template>
  <NuxtLink :to="`/posts/${props.post.id}`" class="post">
    <p class="post__title">{{ props.post.title }}</p>
    <p class="post__body">{{ props.post.body }}</p>
  </NuxtLink>
</template>

<style scoped lang="scss">
.post {
  border: 1px solid var(--text-color);
  border-radius: 1rem;
  padding: 1rem;
  cursor: pointer;
  transition: scale 100ms ease-in-out;
  color: var(--text-color);
  text-decoration: none;

  &:hover {
    scale: 1.025;
  }

  &__title {
    font-size: 1.25rem;
    font-weight: 500;
    margin-bottom: 1rem;
  }

  &__body {
    font-size: 0.8rem;
  }
}
</style>
