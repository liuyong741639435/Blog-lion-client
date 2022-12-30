import { ref } from "vue";
import { ApiGetArticle } from "../../api/article";

export function useHooks() {
  let title = ref("");
  let contentHtml = ref("");

  const editorConfig = {
    readOnly: true, // 只读
  };

  function getArticle(aId: string) {
    ApiGetArticle({
      aId,
    })
      .then((res) => {
        if (res.code === 0) {
          title.value = res.data?.title ?? "";
          contentHtml.value = res.data?.content ?? "";
        }
      })
      .catch((err) => console.error(err));
  }

  return {
    mode: "default", // 或 'simple'
    editorConfig,
    contentHtml,
    title,
    getArticle,
  };
}
