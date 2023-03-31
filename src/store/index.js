import { createStore } from "vuex";
import { auth } from "./auth.module";
import { teste } from "./teste.module";

const store = createStore({
  modules: {
    auth,
    teste,
  },
});

export default store;
