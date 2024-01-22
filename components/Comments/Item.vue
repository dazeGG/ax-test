<script setup lang="ts">
import type { IComment } from "~/typing/IComment";

const props = defineProps<{
  comment: IComment;
}>();
</script>

<template>
  <div class="comment">
    <div class="comment__user user">
      <span class="user__name" v-text="props.comment.name" />
      (<a
        class="user__email"
        :href="`mailto:${props.comment.email}`"
        v-text="props.comment.email"
      />)
    </div>
    <p class="comment__body" v-text="props.comment.body" />
  </div>
</template>

<style scoped lang="scss">
.comment {
  &__body {
    margin-top: 0.25rem;
    font-size: 0.75rem;
    font-weight: 100;
  }
}

.user {
  &__email {
    font-weight: 100;
    font-style: italic;
  }
}
</style>
