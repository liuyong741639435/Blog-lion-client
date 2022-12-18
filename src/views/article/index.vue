<script setup lang="ts">
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { Editor } from "@wangeditor/editor-for-vue";
import { useHooks } from "./hooks";
import { useRoute } from "vue-router";

const route = useRoute();
const { mode, contentHtml, editorConfig, getArticle } = useHooks();

getArticle(route.params.aId as string);
</script>
<template>
  <div style="border: 1px solid #ccc">
    <Editor
      style="overflow-y: hidden"
      v-model="contentHtml"
      :defaultConfig="editorConfig"
      :mode="mode"
    />
  </div>
</template>
