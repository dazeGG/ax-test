<script setup lang="ts">
import type { IComment } from "~/typing/IComment";

import CommentsItem from "~/components/Comments/Item";

const props = defineProps<{
  comments: IComment[];
}>();
</script>

<template>
  <div class="comments">
    <div class="comments__header">
      <h2 class="comments__title">Comments</h2>
      <slot name="header-right" />
    </div>
    <div class="comments__list">
      <CommentsItem
        v-for="comment in props.comments"
        :key="comment.id"
        :comment="comment"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.comments {
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__list {
    display: flex;
    flex-direction: column;
    row-gap: 0.75rem;
  }
}

:deep(.p-inputtext) {
  padding: 0.5rem 0.5rem 0.5rem 3rem;
}
</style>
