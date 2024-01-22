<script setup lang="ts">
import type { IComment } from "~/typing/IComment";

const props = defineProps<{
  comment: IComment;
}>();
</script>

<template>
  <span>{{ props.comment }}</span>
</template>

<style scoped lang="scss"></style>
