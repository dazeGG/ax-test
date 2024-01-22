<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

import type { Ref } from "vue";
import type { IPost } from "~/typing/IPost";

import VPage from "~/components/UI/VPage";

const post: Ref<IPost> = ref({});

onMounted(() => {
  const {
    params: { id },
  } = useRoute();

  fetch(`https://jsonplaceholder.typicode.com/posts/${id}`).then(
    async (response) => (post.value = await response.json()),
  );
});
</script>

<template>
  <VPage :title="post.title">
    {{ post.body }}
  </VPage>
</template>

<style scoped lang="scss"></style>
