<script setup lang="ts">
import type { IPost } from "~/typing/IPost";

import PostsItem from "~/components/Posts/Item";

const props = defineProps<{
  posts: IPost[];
}>();
</script>

<template>
  <div class="posts">
    <PostsItem v-for="post in props.posts" :key="post.id" :post="post" />
  </div>
</template>

<style scoped lang="scss">
.posts {
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
}
</style>
