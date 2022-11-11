import axios from "axios";
import { setToken, getToken } from "./token";
import config from "../config";

const request = axios.create({
  baseURL: config.baseURL,
  timeout: config.timeout,
  headers: {
    "Content-Type": "application/json",
  },
});

// 请求拦截器
request.interceptors.request.use((config) => {
  // 统一处理的一些内容
  // 1 token
  const token = getToken();
  if (token) {
    config.headers = { Authorization: token, ...config.headers }; // 如果调用api时，有在头部设置其他数据，以调用api时传入的为准
  }
  // end
  return config;
});

// 响应拦截器
request.interceptors.response.use((response) => {
  // 通过网络状态码，做不同的处理
  switch (response.status) {
    case 200:
      // 1 获取token 根据后端返回数据的解构，取值。
      // 2 也可不在拦截器处理token存储，如果token在下线前不会过期，不需要重新更新token，只需要在登录或者其他接口得到token时处理就行，不需要在这里每次都查询一下是否有token
      const token = response.data?.data.token;
      if (token) setToken(token);
      return response.data;
    case 401:
      Promise.reject("无权访问");
    // 响应的操作，如跳转到登录页面
    case 403:
      Promise.reject("token认证失败");
    // 重新登录，或者重新获取token
    default:
      Promise.reject("未知错误");
  }
});

export default request;
