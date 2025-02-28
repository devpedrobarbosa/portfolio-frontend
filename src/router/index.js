import { createRouter, createWebHistory } from "vue-router";
import Home from "../Home.vue";
import Admin from "../Admin.vue";
import NotFound from "../NotFound.vue";
import Login from "@/Login.vue";
import { authService } from "@/services/auth";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/admin",
    name: "Admin",
    component: Admin,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!authService.checkAuth()) {
      next({
        path: "/login",
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  } else {
    next();
  }
  document.title = to.name ? `${to.name} | Pedro Barbosa` : "Pedro Barbosa";
});

export default router;
