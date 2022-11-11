import request from "../utils/request"

export const apiQueryUserName = (data: API.QueryUserName) => request.get<any, API.Response<string>>('/api/user/queryUserName', { params: data })

export const apiRegister = (data: API.Register) => request.post<any, API.Response<string>>('/api/user/register', JSON.stringify(data))

export const apiLogin = (data: API.Login)=> request.post<any, API.Response<string>>('/api/user/login', JSON.stringify(data))