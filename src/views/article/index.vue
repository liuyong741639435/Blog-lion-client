<script setup lang="ts">
import "@wangeditor/editor/dist/css/style.css"; // 引入 css
import { Editor } from "@wangeditor/editor-for-vue";
import { useArticle } from "./article";
import { useRoute } from "vue-router";

import comments from "./comments/index.vue";

const route = useRoute();
const { mode, contentHtml, title, editorConfig, getArticle } = useArticle();

const aId = Array.isArray(route.params.aId)
  ? route.params.aId[0]
  : route.params.aId;

getArticle(route.params.aId as string);
</script>
<template>
  <div class="article">
    <h1>{{ title }}</h1>
    <div class="editor">
      <Editor
        v-model="contentHtml"
        :defaultConfig="editorConfig"
        :mode="mode"
      />
    </div>
    <div class="comments">
      <comments :aId="aId" />
    </div>
  </div>
</template>
<style lang="less" scoped>
.article {
  width: 1200px;
  margin: 0 auto;
  background-color: #fff;
  .editor {
    height: calc(100vh - 140px);
  }
}
</style>
