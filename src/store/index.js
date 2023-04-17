import { createStore } from "vuex";
import { auth } from "./auth.store.js";
import { teste } from "./teste.store.js";
import { layout } from "./layout.store.js";
import { cfg_estabelecimento } from "./cfg/estabelecimento/estabelecimento.store.js";
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
    cfg_estabelecimento,
  },
  // plugins: [vuexPersist.plugin],
});

export default store;
