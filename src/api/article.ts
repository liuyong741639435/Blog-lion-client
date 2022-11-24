import request from "../utils/request";

export const ApiUpdateArticle =(data: API.UpdateArticle)=> request.post<any, API.Response<string>>('/article/updateArticle', JSON.stringify(data))