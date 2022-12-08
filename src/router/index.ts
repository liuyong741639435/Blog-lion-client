import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "",
    redirect: "/index",
  },
  {
    path: "/test",
    name: "test",
    component: () => import("@/views/test/index.vue"),
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
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
