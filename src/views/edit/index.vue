<script setup lang="ts">
import "@wangeditor/editor/dist/css/style.css"; // 引入 css
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import { useApi, useWangeEdit } from "./hooks";
const { editorRef, toolbarConfig, editorConfig, handleCreated, mode } =
  useWangeEdit();

const { title, contentHtml, publishArticle, tips } = useApi();
</script>

<template>
  <div class="edit">
    <div class="title">
      <a-input v-model:value="title" placeholder="请输入标题" />
      <span class="tips">{{ tips }}</span>
      <div class="btn">
        <a-button>草稿箱</a-button>
        <a-button @click="publishArticle">发表</a-button>
      </div>
    </div>
    <div class="editBody">
      <div class="toolbar">
        <Toolbar
          :editor="editorRef"
          :defaultConfig="toolbarConfig"
          :mode="mode"
        />
      </div>
      <div class="editor">
        <Editor
          v-model="contentHtml"
          :defaultConfig="editorConfig"
          :mode="mode"
          @onCreated="handleCreated"
        />
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.edit {
  width: 1200px;
  margin: 0 auto;
  .title {
    padding: 5px 0;
    display: flex;
    align-items: center;

    input {
      border: none;
      padding: 0 5px;
      flex: 1;
    }
    .tips {
      color: rgb(201 205 212);
      font-size: 14px;
      padding: 0 5px;
      width: 100px;
      text-align: center;
    }
    .btn {
      width: 200px;
      & > button {
        margin-left: 5px;
      }
    }
  }

  .toolbar {
    // border-bottom: 1px solid #ccc;
  }
  .editor {
    height: calc(100vh - 140px);
    min-width: 300px;
    overflow-y: hidden;
  }
}
</style>
