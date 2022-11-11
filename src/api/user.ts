import request from "../utils/request"

export const apiRegister = (data: API.Register) => {
    return request.post<any, API.Response<string>>('/user/register', JSON.stringify(data))
}

export const apiLogin = (data: API.Login)=> {
    return request.post<any, API.Response<string>>('/user/login', JSON.stringify(data))
}