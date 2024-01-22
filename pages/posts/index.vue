<script setup lang="ts">
import { ref, computed, onMounted } from "vue";

import InputText from "primevue/inputtext";
import Paginator from "primevue/paginator";

import type { Ref } from "vue";
import type { IPost } from "~/typing/IPost";

import VPage from "~/components/UI/VPage";
import VLoader from "~/components/UI/VLoader";
import PostsList from "~/components/Posts/List";

const loading: Ref<boolean> = ref(true);
const search: Ref<string> = ref("");
const posts: Ref<IPost[]> = ref([]);

const filteredPosts = computed(() =>
  posts.value.filter(
    (post) =>
      post.title.includes(search.value) || post.body.includes(search.value),
  ),
);

const loadPosts = ({ page, rows }: { page: number; rows: number }): void => {
  loading.value = true;
  fetch(
    `https://jsonplaceholder.typicode.com/posts?_start=${page * rows}&_limit=${rows}`,
  )
    .then(async (res) => {
      posts.value = await res.json();
    })
    .finally(() => (loading.value = false));
};

onMounted(() => loadPosts({ page: 0, rows: 5 }));
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
        @page="loadPosts"
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
