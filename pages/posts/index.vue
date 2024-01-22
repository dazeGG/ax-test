<script setup lang="ts">
import { ref, computed, watchEffect, onMounted } from "vue";

import Paginator from "primevue/paginator";
import InputText from "primevue/inputtext";
import Button from "primevue/button";

import type { Ref } from "vue";
import type { IPost } from "~/typing/IPost";

import VLoader from "~/components/UI/VLoader";
import VPage from "~/components/UI/VPage";
import PostsList from "~/components/Posts/List";

const loading: Ref<boolean> = ref(true);

const sort: Ref<string> = ref("");
const search: Ref<string> = ref("");
const page: Ref<number> = ref(1);
const lastPage: Ref<number> = ref(20);
const rows: Ref<number> = ref(5);

const posts: Ref<IPost[]> = ref([]);

const changeSort = () => {
  if (sort.value === "asc") sort.value = "desc";
  else if (sort.value === "desc") sort.value = "";
  else sort.value = "asc";
};

const sortIcon = computed(() => {
  switch (sort.value) {
    case "asc":
      return "pi-sort-alpha-down";
    case "desc":
      return "pi-sort-alpha-down-alt";
    default:
      return "pi-sort";
  }
});

const updatePage = ({ page: newPage }: { page: number }) =>
  (page.value = newPage + 1);

const loadPosts = () => {
  loading.value = true;

  fetch(
    "https://jsonplaceholder.typicode.com/posts?" +
      (sort.value ? `_sort=title&_order=${sort.value}&` : "") +
      new URLSearchParams({
        q: search.value,
        _page: page.value.toString(),
        _limit: rows.value.toString(),
      }),
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

onMounted(loadPosts);
watchEffect(loadPosts);
</script>

<template>
  <VPage title="Posts">
    <template #header-right>
      <div class="actions">
        <Button class="actions__sort" @click="changeSort">
          <i class="pi" :class="sortIcon" />
        </Button>
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
.actions {
  display: flex;
  column-gap: 0.5rem;
}

.p-button {
  min-width: unset;
}

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
