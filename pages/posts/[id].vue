<script setup lang="ts">
import _ from "lodash";

import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";

import InputText from "primevue/inputtext";

import type { Ref } from "vue";
import type { IPost } from "~/typing/IPost";
import type { IComment } from "~/typing/IComment";

import VLoader from "~/components/UI/VLoader";
import VPage from "~/components/UI/VPage";
import CommentsList from "~/components/Comments/List";

const loading: Ref<boolean> = ref(true);
const post: Ref<IPost> = ref({
  id: 0,
  title: "Mock post title",
  body: "Mock post body",
  userId: 0,
});

const search: Ref<string> = ref("");
const loadingCommentsLimit = 5;
const comments: Ref<IComment[]> = ref([]);

const filteredComments = computed(() =>
  comments.value.filter(
    (comment: IComment) =>
      comment.name.toLowerCase().includes(search.value.toLowerCase()) ||
      comment.email.toLowerCase().includes(search.value.toLowerCase()),
  ),
);

const loadComments = () => {
  loading.value = true;

  fetch(
    "https://jsonplaceholder.typicode.com/comments?" +
      new URLSearchParams({
        postId: post.value.id.toString(), // * Можно закомментировать эту строчку для проверки подгрузки комментов по скроллу
        _start: comments.value.length.toString(),
        _limit: loadingCommentsLimit.toString(),
      }),
  )
    .then(async (res) => {
      const newComments = await res.json();

      newComments.forEach((comment: IComment) => comments.value.push(comment));

      if (newComments.length < loadingCommentsLimit)
        document.removeEventListener("scroll", loadCommentsCheck);
      else loadCommentsCheck();
    })
    .finally(() => (loading.value = false));
};

const loadCommentsCheck = _.debounce(() => {
  const bottom = window.pageYOffset + window.innerHeight;
  const pageHeight = document.documentElement.offsetHeight;
  if (pageHeight - bottom < 100) loadComments();
}, 200);

onMounted(() => {
  document.addEventListener("scroll", loadCommentsCheck);

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
      <CommentsList class="post__comments" :comments="filteredComments">
        <template #header-right>
          <span class="p-input-icon-left">
            <i class="pi pi-search" />
            <InputText v-model="search" placeholder="Search by user" />
          </span>
        </template>
      </CommentsList>
    </div>
  </VPage>
</template>

<style scoped lang="scss"></style>
