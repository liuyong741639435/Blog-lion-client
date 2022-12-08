import { ApiGetArticleList } from "../../../api/article";

export function useData() {
  function getArticleList() {
    ApiGetArticleList({})
      .then((res) => {
        console.log(res);
        if (res.code === 0) {
          console.log(res);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => {});
  }
  return {
    getArticleList,
  };
}
