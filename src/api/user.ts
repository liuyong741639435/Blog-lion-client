import request from "../utils/request"

export const apiQueryUserName = (data: API.QueryUserName) => request.get<any, API.Response<string>>('/user/queryUserName', { params: data })

export const apiRegister = (data: API.Register) => request.post<any, API.Response<string>>('/user/register', JSON.stringify(data))

export const apiLogin = (data: API.Login)=> request.post<any, API.Response<string>>('/user/login', JSON.stringify(data))