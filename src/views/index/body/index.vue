<script setup lang="ts">
import { useHooks } from "./hooks";

const { getArticleList } = useHooks();
getArticleList();
</script>
<template>
  <div class="body"></div>
</template>
<style lang="less" scoped></style>
