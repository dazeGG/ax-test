<script setup lang="ts">
import { ref } from "vue";

import type { Ref } from "vue";
import type { IPost } from "~/typing/IPost";

import VPage from "~/components/UI/VPage";
import PostsList from "~/components/Posts/List";

const posts: Ref<IPost[]> = ref([]);

fetch("https://jsonplaceholder.typicode.com/posts").then(async (response) => {
  posts.value = await response.json();
});
</script>

<template>
  <VPage title="Posts">
    <PostsList :posts="posts" />
  </VPage>
</template>
