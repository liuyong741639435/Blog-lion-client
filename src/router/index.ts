import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import cancelToken from "../utils/cancelToken";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "",
    redirect: "/index",
  },
  // 首页
  {
    path: "/index",
    name: "index",
    component: () => import("@/views/index/index.vue"),
  },
  {
    path: "/edit/drafts/:aId?",
    name: "edit",
    component: () => import("@/views/edit/index.vue"),
  },
  // user
  {
    path: "/user/account/:pageState?",
    name: "account",
    component: () => import("@/views/user/account/index.vue"),
  },
  {
    path: "/article/:aId",
    name: "article",
    component: () => import("@/views/article/index.vue"),
  },
  {
    path: "/user/personal/:userId?",
    name: "personal",
    component: () => import("@/views/user/personal/index.vue"),
  },
];
//

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 全局后置钩子
router.afterEach((to, from) => {
  // 离开页面时
  cancelToken.cancelAll(); // 取消所有未返回的ajax请求
});

export default router;
