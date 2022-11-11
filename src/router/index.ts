import { createRouter, createWebHistory,  RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "index",
    redirect: '/test',
  },
  {
    path: "/test",
    name: "test",
    component: () => import("@/views/test/index.vue"),
  },
];

export default createRouter({
    history: createWebHistory(),
    routes,
})
