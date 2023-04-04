import { createRouter, createWebHistory } from "vue-router";
import HelloWorld from "../components/HelloWorld.vue";
import Home from "../components/Home.vue";
import Login from "../components/Login.vue";
import Livre from "../components/Livre.vue";
import store from "../store";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/home",
    name: "home",
    component: Home,
  },
  {
    path: "/hello",
    name: "hello",
    component: HelloWorld,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: {
      doNotRequiresAuth: true,
    },
  },
  {
    path: "/livre",
    name: "livre",
    component: Livre,
    meta: {
      doNotRequiresAuth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (
    to.matched.some((record) => record.meta?.doNotRequiresAuth) ||
    store.getters["auth/isLoggedIn"]
  ) {
    console.log("tamo livre... bora");
    next();
  } else {
    console.log("ferrou, login de novo...");
    to.matched.some((record) =>
      console.log("record.meta?.doNotRequiresAuth: " + record.meta?.doNotRequiresAuth)
    );
    console.log("store.getters.isLoggedIn: " + store.getters["auth/isLoggedIn"]);
    console.dir(store);
    next({ name: "login" });
  }
});

export default router;
