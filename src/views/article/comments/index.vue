<script setup lang="ts">
import { useComments } from "./comments";
const { commentList, getComment, commentText } = useComments();

const props = defineProps<{ aId: string }>();
getComment(props.aId);
</script>
<template>
  <div class="comments">comments</div>
  <a-textarea
    v-model:value="commentText"
    placeholder="textarea with clear icon"
    allow-clear
  />
  <a-button>发表</a-button>
</template>
<style lang="less" scoped>
.comments {
  margin: 0 auto;
  background-color: #fff;
}
</style>
