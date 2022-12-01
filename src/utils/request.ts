import axios from "axios";
import { setToken, getToken } from "./token";
import config from "../config";
import { useRouter } from "vue-router";

const router = useRouter()

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
  const res = response.data; // 后端返回的数据
  // 通过网络状态码，做不同的处理
  switch (response.status) {
    case 200:
      return res;
    case 401:
      Promise.reject("无权访问");
      router.push('/user/account/login')
    // 响应的操作，如跳转到登录页面
    case 403:
      Promise.reject("token认证失败");
      router.push('/user/account/login')
    // 重新登录，或者重新获取token
    default:
      Promise.reject("未知错误");
  }
});

export default request;
