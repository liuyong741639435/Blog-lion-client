import axios from "axios";
import { getToken } from "./token";
import config from "../config";
import router from "../router";

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
request.interceptors.response.use(
  (response) => {
    return response.data; // 后端返回的数据
  },
  (error) => {
    // 当http状态码 不是 200-300 就会走这里
    switch (error.response.status) {
      case 401:
        Promise.reject("无权访问");
        router.push("/user/account/login");
      // 响应的操作，如跳转到登录页面
      case 403:
        Promise.reject("token认证失败");
        router.push("/user/account/login");
      // 重新登录，或者重新获取token
      default:
        Promise.reject("未知错误");
    }
  }
);

export default request;
