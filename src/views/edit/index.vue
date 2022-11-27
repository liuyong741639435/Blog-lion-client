<script setup lang="ts">
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { useApi, useWangeEdit } from '../edit/editTs';
const {
  editorRef,
  toolbarConfig,
  editorConfig,
  handleCreated,
  mode
} = useWangeEdit();

const {
  title,
  contentHtml,
  publishArticle
} = useApi();


</script>

<template>
  <div class="title">
    <input v-model="title" />
    <span class="btn">
      <a-button>草稿箱</a-button>
      <a-button @click="publishArticle">发表</a-button>
    </span>
  </div>
  <div style="border: 1px solid #ccc">
    <Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef" :defaultConfig="toolbarConfig" :mode="mode" />
    <Editor style="height: 500px; overflow-y: hidden;" v-model="contentHtml" :defaultConfig="editorConfig" :mode="mode"
      @onCreated="handleCreated" />
  </div>
</template>
<style lang="less" scoped>
.title {
  padding: 5px 0;
  position: relative;

  input {
    border: 1px solid #eaeaea;
    width: 80%;
  }

  .btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);

    &>button {
      margin-left: 5px;
    }
  }
}
</style>