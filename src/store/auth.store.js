import api from "@/services/api.js";
import router from "@/router/router.js";

const crsrTkn = JSON.parse(localStorage.getItem("crsrTkn"));

const API_URL = import.meta.env.VITE_CORE_URL;

const initialState = {
  status: {
    loggedIn: null,
  },
  crsrTkn: null,
  loginErrorMessage: null,
};

if (crsrTkn) {
  initialState.status.loggedIn = true;
  initialState.crsrTkn = crsrTkn;
}

export const auth = {
  namespaced: true,

  state: initialState,

  actions: {
    async login({ commit }, user) {
      commit("layout/setLoading", true, { root: true });

      try {
        const rsLogin = await api.post(API_URL + "/api/login", {
          username: user.username,
          password: user.password,
        });
        console.log(">>>>rs login");
        console.log(rsLogin);

        if (rsLogin?.data?.token) {
          commit("loginSuccess", rsLogin.data.token);
          console.log("deu boa o login,,,, vou pro / agora");
          await router.push({ name: "inicial" });
        } else {
          throw new Error("Erro ao efetuar o login.");
        }
      } catch (e) {
        console.log("cai no catch do auth.store.js login");
        commit("loginFailure", e);
      }

      commit("layout/setLoading", false, { root: true });
    },
  },

  getters: {
    isLoggedIn: (state) => state.status.loggedIn,

    getLoginErrorMessage: (state) => state.loginErrorMessage,
  },

  mutations: {
    loginSuccess(state, crsrTkn) {
      state.status.loggedIn = true;
      state.crsrTkn = crsrTkn;
      localStorage.setItem("crsrTkn", JSON.stringify(crsrTkn));
    },

    loginFailure(state, err) {
      const msg = err?.response?.data?.message || err.message || "Erro ao efetuar o login";
      console.log("estou no loginFailure do auth.store.js");
      console.log(msg);
      state.loginErrorMessage = msg;
      state.status.loggedIn = false;
      state.crsrTkn = null;
    },
  },
};
