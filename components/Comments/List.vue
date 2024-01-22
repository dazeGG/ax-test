<script setup lang="ts">
import type { IComment } from "~/typing/IComment";

const props = defineProps<{
  comments: IComment[];
}>();
</script>

<template>
  <div class="comments">
    <h2 class="comments__title">Comments</h2>
    {{ props.comments }}
  </div>
</template>

<style scoped lang="scss"></style>
