import request from "../utils/request";

export const ApiGetArticle = (data: API.GetArticle) =>
  request.get<any, API.Response<{ title: string; content: string }>>(
    "/article/getArticle",
    {
      params: data,
    }
  );
export const ApiEditArticle = (data: API.EditArticle) =>
  request.post<any, API.Response<{ aId: string }>>(
    "/article/editArticle",
    JSON.stringify(data)
  );

export const ApiSetArticleState = (data: API.SetArticleState) =>
  request.post<any, API.Response<string>>(
    "/article/setArticleState",
    JSON.stringify(data)
  );

export const ApiGetArticleList = (data: API.GetArticleList) =>
  request.get<any, API.Response<{ title: string; content: string }>>(
    "/article/getArticleList",
    {
      params: data,
    }
  );
