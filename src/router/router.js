import { createRouter, createWebHistory } from "vue-router";

import HelloWorld from "../components/HelloWorld.vue";
import Home from "../components/Home.vue";
import Login from "../components/Login.vue";
import Livre from "../components/Livre.vue";
import EstabelecimentoList from "../components/cfg/estabelecimento/list.vue";
import EstabelecimentoForm from "../components/cfg/estabelecimento/form.vue";

import store from "../store";

const routes = [
  {
    path: "",
    component: Home,
  },
  {
    path: "/",
    name: "inicial",
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
    path: "/v/cfg/estabelecimento/list",
    name: "cfg-estabelecimento-list",
    component: EstabelecimentoList,
  },
  {
    path: "/v/cfg/estabelecimento/form",
    name: "cfg-estabelecimento-form",
    component: EstabelecimentoForm,
    props: (route) => ({ id: route.query.id }),
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
  if (to.matched.some((record) => record.name === "login") && store.getters["auth/isLoggedIn"]) {
    console.log("cara, tá indo pro login pq? bora pro /");
    next({ name: "inicial" });
    return;
  }

  if (
    to.matched.some((record) => record.meta?.doNotRequiresAuth) ||
    store.getters["auth/isLoggedIn"]
  ) {
    // check if token is still valid

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
