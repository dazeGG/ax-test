<script setup lang="ts">
import type { IPost } from "~/typing/IPost";

const props = defineProps<{
  posts: IPost[];
}>();
</script>

<template>
  <div class="posts-list">
    <h1>Posts</h1>
    {{ props.posts }}
  </div>
</template>
