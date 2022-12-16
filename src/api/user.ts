import request from "../utils/request";

// 后续定义一个方法，把密码加密之后，发到后端，不要传递用户输入的值 todo
// 查询用户名是否被注册
export const apiQueryUserName = (data: API.QueryUserName) =>
  request.get<any, API.Response>("/user/queryUserName", {
    params: data,
  });
// 注册
export const apiRegister = (data: API.Register) =>
  request.post<any, API.Response>("/user/register", JSON.stringify(data));
// 登录
export const apiLogin = (data: API.Login) =>
  request.post<any, API.Response<{ token: string } | null>>(
    "/user/login",
    JSON.stringify(data)
  );
// 修改密码
export const apiUpdatePassword = (data: { password: number }) =>
  request.post<any, API.Response>("/user/updatePassword", JSON.stringify(data));

// 获取用户信息  userId 不传获取的就是自身的
export const apiGetUserInfo = (data: { userId?: string }) =>
  request.get<any, API.Response>("/user/userInfo", {
    params: data,
  });
// 修改自身用户信息
export const apiUpdateUserInfo = (data: API.UserInfo) =>
  request.get<any, API.Response>("/user/updateUserInfo", {
    params: data,
  });
