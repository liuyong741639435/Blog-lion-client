import { ref } from "vue";
import { ApiGetArticleList } from "../../../api/article";
import { ArticleListItem } from "../../../types/article";

export function useHooks() {
  const articleList = ref<ArticleListItem[]>([]);
  function getArticleList() {
    ApiGetArticleList({})
      .then((res) => {
        console.log(res);
        if (res.code === 0) {
          articleList.value = res.data;
        }
      })
      .catch((err) => console.error(err))
      .finally(() => {});
  }
  return {
    getArticleList,
  };
}
