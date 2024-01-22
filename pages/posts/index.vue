<script setup lang="ts">
import { ref, watchEffect, onMounted } from "vue";

import InputText from "primevue/inputtext";
import Paginator from "primevue/paginator";

import type { Ref } from "vue";
import type { IPost } from "~/typing/IPost";

import VLoader from "~/components/UI/VLoader";
import VPage from "~/components/UI/VPage";
import PostsList from "~/components/Posts/List";

const loading: Ref<boolean> = ref(true);
const search: Ref<string> = ref("");
const page: Ref<number> = ref(1);
const lastPage: Ref<number> = ref(20);
const rows: Ref<number> = ref(5);
const posts: Ref<IPost[]> = ref([]);

const loadPosts = () => {
  loading.value = true;
  fetch(
    `https://jsonplaceholder.typicode.com/posts?q=${search.value}&_page=${page.value}&_limit=${rows.value}`,
  )
    .then(async (res) => {
      lastPage.value = parseInt(
        res.headers
          .get("Link")
          .split(";")[2]
          .split(", ")[1]
          .split("&")[1]
          .split("=")[1],
      );
      posts.value = await res.json();
    })
    .finally(() => (loading.value = false));
};

const updatePage = ({ page: newPage }: { page: number }) =>
  (page.value = newPage + 1);

onMounted(() => loadPosts());

watchEffect(loadPosts);
</script>

<template>
  <VPage title="Posts">
    <template #header-right>
      <div class="actions">
        <div class="actions__sort"></div>
        <span class="p-input-icon-left actions__search">
          <i class="pi pi-search" />
          <InputText v-model="search" placeholder="Search" />
        </span>
      </div>
    </template>
    <template #default>
      <VLoader v-if="loading" />
      <PostsList :posts="posts" />
      <Paginator
        :rows="rows"
        :total-records="rows * lastPage"
        :rows-per-page-options="[5, 10, 20, 30, 40, 50]"
        class="paginator"
        @update:rows="(value: number) => (rows = value)"
        @page="updatePage"
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
  justify-content: center;
}

:deep(.p-dropdown) {
  align-items: center;
}
</style>
