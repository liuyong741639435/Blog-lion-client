<script setup lang="ts">
import { useData } from "./body";

const { getArticleList } = useData();
getArticleList();
</script>
<template>
  <div class="body"></div>
</template>
<style lang="less" scoped></style>
