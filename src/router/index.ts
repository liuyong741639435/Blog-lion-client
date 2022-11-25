import { createRouter, createWebHistory,  RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "index",
    redirect: '/user/account',
  },
  {
    path: "/test",
    name: "test",
    component: () => import("@/views/test/index.vue"),
  },
  { 
    path: '/edit',
    name: 'edit',
    component: () => import("@/views/edit/index.vue")
  },
  // user
  { 
    path: '/user/account/:state?',
    name: 'account',
    component: () => import("@/views/user/account/index.vue")
  }
];

export default createRouter({
    history: createWebHistory(),
    routes,
})
