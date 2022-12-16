import { ArticleListItem } from "../types/article";
import request from "../utils/request";

// 读取自己的文章,以编辑模式。
export const ApiGetArticleByUser = (data: API.GetArticle) =>
  request.get<any, API.Response<{ title: string; content: string }>>(
    "/article/getArticleByUser",
    {
      params: data,
    }
  );
// 访问他人文章
export const ApiGetArticle = (data: API.GetArticle) =>
  request.get<
    any,
    API.Response<{
      title: string;
      content: string;
      browseCount: string;
      supportCount: string;
      commentCount: string;
    }>
  >("/article/getArticle", {
    params: data,
  });
// 编辑文章
export const ApiEditArticle = (data: API.EditArticle) =>
  request.post<any, API.Response<{ aId: string }>>(
    "/article/editArticle",
    JSON.stringify(data)
  );
// 修改文章状态
export const ApiSetArticleState = (data: API.SetArticleState) =>
  request.post<any, API.Response>(
    "/article/setArticleState",
    JSON.stringify(data)
  );
// 删除文章 todo put要多留意
export const ApiDeleteArticle = (data: { aId: string }) =>
  request.put<any, API.Response>(
    "/article/deleteArticle",
    JSON.stringify(data)
  );
// 获取文章列表
export const ApiGetArticleList = (data: API.GetArticleList) =>
  request.get<any, API.Response<ArticleListItem[]>>("/article/getArticleList", {
    params: data,
  });
// 获取自己的文章列表
export const ApiGetArticleListByUser = (data: API.GetArticleList) =>
  request.get<any, API.Response<ArticleListItem[]>>(
    "/article/getArticleListByUser",
    {
      params: data,
    }
  );
