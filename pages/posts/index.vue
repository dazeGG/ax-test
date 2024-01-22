<script setup lang="ts">
import { ref, computed, onMounted } from "vue";

import InputText from "primevue/inputtext";
import Paginator from "primevue/paginator";

import type { Ref } from "vue";
import type { IPost } from "~/typing/IPost";

import VPage from "~/components/UI/VPage";
import VLoader from "~/components/UI/VLoader";
import PostsList from "~/components/Posts/List";

const loading: Ref<boolean> = ref(false);
const search: Ref<string> = ref("");
const posts: Ref<IPost[]> = ref([]);

const filteredPosts = computed(() =>
  posts.value.filter(
    (post) =>
      post.title.includes(search.value) || post.body.includes(search.value),
  ),
);

const loadPosts = async (
  page: number = 0,
  rows: number = 5,
): Promise<IPost[]> => {
  loading.value = true;

  const posts: IPost[] = [];

  for (let postId = page * rows + 1; postId < (page + 1) * rows + 1; postId++) {
    const post = await (
      await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
    ).json();
    posts.push(post);
  }

  loading.value = false;
  return posts;
};

const pageUpdate = async ({ page, rows }: { page: number; rows: number }) =>
  (posts.value = await loadPosts(page, rows));

onMounted(async () => (posts.value = await loadPosts()));
</script>

<template>
  <VPage title="Posts">
    <template #header-right>
      <span class="p-input-icon-left">
        <i class="pi pi-search" />
        <InputText v-model="search" placeholder="Search" />
      </span>
    </template>
    <template #default>
      <VLoader v-if="loading" />
      <PostsList :posts="filteredPosts" />
      <Paginator
        :rows="5"
        :total-records="100"
        :rows-per-page-options="[5, 10, 20, 30, 40, 50]"
        class="paginator"
        @page="pageUpdate"
      />
    </template>
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
</style>
