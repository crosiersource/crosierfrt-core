import { createStore } from "vuex";
import { auth } from "./auth.module";
import { teste } from "./teste.module";
import { layout } from "./layout.module";
// import VuexPersist from "vuex-persist";

// const vuexPersist = new VuexPersist({
//   key: "my-app",
//   storage: localStorage,
// });

const store = createStore({
  modules: {
    auth,
    teste,
    layout,
  },
  // plugins: [vuexPersist.plugin],
});

export default store;
