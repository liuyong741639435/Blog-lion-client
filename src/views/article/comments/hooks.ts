import { ref } from "vue";
import {
  apiComment,
  apiGetComment,
  CommentListItem,
} from "../../../api/interactionBetweenUsers";

export function useHooks() {
  const commentList = ref<CommentListItem[]>([]);

  const commentText = ref("");

  //  获取当前文章评论
  function getComment(aId: string) {
    apiGetComment({ aId })
      .then((res) => {
        if (res.code === 0) {
          commentList.value = res.data!;
        }
      })
      .catch((err) => console.error(err));
  }
  // 评论当前文章
  function comment(params: {
    aId: string;
    content: string;
    parentId?: string;
  }) {
    apiComment(params)
      .then((res) => {})
      .catch((err) => console.error(err));
  }
  return {
    commentList,
    getComment,
    commentText,
  };
}
