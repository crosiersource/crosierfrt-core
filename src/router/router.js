import { createWebHistory, createRouter } from "vue-router";

import MainLayout from "@/layouts/MainLayout.vue";
import RawLayout from "@/layouts/RawLayout.vue";
import Home from "@/views/Home.vue";
import Sobre from "@/views/Sobre.vue";
import Settings from "@/views/Settings.vue";
import User from "@/views/User.vue";
import Login from "@/views/Login.vue";
import NotFound from "@/views/NotFound.vue";
import GruposList from "@/views/Security/GruposList.vue";
import { useAuthStore } from "@/stores/auth.store";

const routes = [
  {
    path: "/",
    component: MainLayout,
    children: [
      { path: "/", component: Home },
      { path: "/home", redirect: "/" },
      { path: "/sobre", component: Sobre },
      { path: "/settings", component: Settings },
      { path: "/sec/grupos/list", component: GruposList },
      { path: "/user/:id", component: User },
    ],
  },
  {
    path: "/login",
    component: RawLayout,
    children: [{ path: "", component: Login }],
  },
  {
    path: "/:pathMatch(.*)*",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to) => {
  console.log("beforeEach", to.path);

  const publicPages = ["/login", "/esqueciMinhaSenha"];
  const authRequired = !publicPages.includes(to.path);
  const authStore = useAuthStore();

  authStore.loadAllFromLocalStorage();

  if (to.path !== "/login") {
    if (authStore.isTokenExpired()) {
      await authStore.doRefreshToken();
      console.log("acabei de refrescar");
    }

    if (authRequired && authStore.isTokenExpired()) {
      console.log("deu ruim, indo pro login");
      console.log("isTokenExpired", authStore.isTokenExpired());
      authStore.returnUrl = to.fullPath;
      return "/login";
    }
  }
});

export default router;
