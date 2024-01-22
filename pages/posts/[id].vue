<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

import type { Ref } from "vue";
import type { IPost } from "~/typing/IPost";
import type { IComment } from "~/typing/IComment";

import VLoader from "~/components/UI/VLoader";
import VPage from "~/components/UI/VPage";
import CommentsList from "~/components/Comments/List";

const loading: Ref<boolean> = ref(true);
const post: Ref<IPost> = ref({});
const comments: Ref<IComment[]> = ref([]);

const loadComments = () => {
  loading.value = true;

  fetch(
    `https://jsonplaceholder.typicode.com/comments?postId=${post.value.id}&_start=${comments.value.length}&_limit=5`,
  )
    .then(async (res) =>
      (await res.json()).forEach((comment) => comments.value.push(comment)),
    )
    .finally(() => (loading.value = false));
};

onMounted(() => {
  const {
    params: { id: postId },
  } = useRoute();

  fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
    .then(async (response) => {
      post.value = await response.json();
      loadComments();
    })
    .finally(() => (loading.value = false));
});
</script>

<template>
  <VPage :title="post.title" :has-back-button="true">
    <VLoader v-if="loading" />
    <div class="post">
      <p class="post__body" v-text="post.body" />
      <CommentsList class="post__comments" :comments="comments" />
    </div>
  </VPage>
</template>

<style scoped lang="scss"></style>
