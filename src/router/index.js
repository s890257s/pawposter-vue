import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    // === 主要布局 poster_layout ===
    {
      name: "poster_layout",
      path: "/",
      component: () => import("@/layouts/PosterLayout.vue"),
      children: [
        {
          path: "/",
          name: "poster_home",
          component: () => import("@/views/ActivityWall.vue"),
        },
        {
          path: "/profile",
          name: "poster_profile",
          component: () => import("@/views/PosterProfile.vue"),
        },
      ],
    },

    // === 登入布局 login_layout ===
    {
      name: "login_layout",
      path: "/login",
      component: () => import("@/layouts/LoginLayout.vue"),
    },

    // === 管理員布局 admin_layout ===
    {
      name: "admin_layout",
      path: "/admin",
      component: () => import("@/layouts/AdminLayout.vue"),
    },

    // === 404 ===
    {
      path: "/:pathMatch(.*)*",
      name: "page_not_found",
      component: () => import("@/layouts/PageNotFound.vue"),
    },
  ],
});

export default router;
