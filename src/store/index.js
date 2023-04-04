import { createStore } from "vuex";
import { auth } from "./auth.module";
import { teste } from "./teste.module";
import { layout } from "./layout.module";

const store = createStore({
  modules: {
    auth,
    teste,
    layout,
  },
});

export default store;
