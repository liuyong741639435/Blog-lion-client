import { ref } from "vue";
import { useRouter } from "vue-router";
import { ApiGetArticleList } from "../../../api/article";
import { ArticleListItem } from "../../../types/article";

export function useBody() {
  const router = useRouter();
  const articleList = ref<ArticleListItem[]>([]);
  function getArticleList() {
    ApiGetArticleList({})
      .then((res) => {
        console.log("res", res);
        if (res.code === 0) {
          const test = new Array(20).fill(1).map((item, index) => ({
            title: "title",
            briefIntroduction: "briefIntroduction",
            nickName: "string",
            iconUrl: "iconUrl",
            userId: "userId",
            aId: `aId${index}`,
            updateDate: new Date().getTime(),
          }));
          console.log("test", test);
          articleList.value = res.data!.length > 0 ? res.data! : test;
          console.log("articleList.value ", articleList.value);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => {});
  }
  function toUser(userId: string) {
    console.log(userId);
    // router.push(`/edit/drafts/${userId}`)
  }
  function toArticle(aId: string) {
    console.log(aId);
    router.push(`/article/${aId}`);
  }
  return {
    articleList,
    getArticleList,
    toUser,
    toArticle,
  };
}
