<script setup lang="ts">
import { ref, onMounted } from "vue";

import Paginator from "primevue/paginator";

import type { Ref } from "vue";
import type { IPost } from "~/typing/IPost";

import VPage from "~/components/UI/VPage";
import PostsList from "~/components/Posts/List";

const posts: Ref<IPost[]> = ref([]);

const loadPosts = async (
  page: number = 0,
  rows: number = 5,
): Promise<IPost[]> => {
  const posts: IPost[] = [];

  for (let i = page * rows + 1; i < (page + 1) * rows + 1; i++) {
    const post = await (
      await fetch(`https://jsonplaceholder.typicode.com/posts/${i}`)
    ).json();
    posts.push(post);
  }

  return posts;
};

const pageUpdate = async ({ page, rows }: { page: number; rows: number }) =>
  (posts.value = await loadPosts(page, rows));

onMounted(async () => (posts.value = await loadPosts()));
</script>

<template>
  <VPage title="Posts">
    <PostsList :posts="posts" />
    <Paginator
      :rows="5"
      :total-records="100"
      :rows-per-page-options="[5, 10, 20, 30, 40, 50]"
      class="paginator"
      @page="pageUpdate"
    />
  </VPage>
</template>

<style scoped lang="scss">
.paginator {
  margin-top: 1rem;
}

:deep(.p-paginator) {
  background: unset;
  border: unset;
}

:deep(.p-dropdown) {
  align-items: center;
}

:deep(.p-inputtext) {
  padding: 0 0 0 1rem;
}
</style>
