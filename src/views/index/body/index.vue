<script setup lang="ts">
import { formatTime } from "../../../utils/tool";
import { useHooks } from "./hooks";
const {
  getArticleList,
  articleList,
  toUser,
  toArticle } = useHooks();
getArticleList();
</script>
<template>
  <div class="body">
    <div class="content">
      <div v-for="item of articleList" :key="item.aId">
        <div class="head">
          <div class="pointer" @click="toUser(item.userId)">{{ item.nickName }}</div>
          |<div class="pointer" @click="toArticle(item.aId)"><span >{{ formatTime(item.updateDate) }}</span></div>
        </div>
        <div class="pointer"  @click="toArticle(item.aId)">{{ item.title }}</div>
        <div class="pointer"  @click="toArticle(item.aId)">{{ item.briefIntroduction }}</div>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.body {
  .content {
    width: 700px;
    min-height: calc(100vh - 65px);
    background-color: #fff;
    margin: 5px auto 0;

    .head {
      display: flex;
    }
  }
}
</style>
