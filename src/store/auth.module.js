import AuthService from "@/services/auth-service.js";
import router from "@/router/index.js";

const loginToken = JSON.parse(localStorage.getItem("loginToken"));

const initialState = {
  status: {
    loggedIn: null,
  },
  loginToken: null,
  loginErrorMessage: null,
};

if (loginToken) {
  initialState.status.loggedIn = true;
  initialState.loginToken = loginToken;
}

export const auth = {
  namespaced: true,

  state: initialState,

  actions: {
    async login({ commit }, user) {
      commit("layout/setLoading", true, { root: true });

      let rsLogin = null;
      try {
        rsLogin = await AuthService.login(user);

        console.log(">>>>rs login");
        console.log(rsLogin);

        if (rsLogin?.data?.token) {
          commit("loginSuccess", rsLogin.data);
          // call vue router to redirect to home page
          await router.push("/");
        } else {
          throw new Error("Erro ao efetuar o login.");
        }
      } catch (e) {
        console.log("cai no catch do auth.module.js login");
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
    loginSuccess(state, loginToken) {
      state.status.loggedIn = true;
      state.loginToken = loginToken;
      localStorage.setItem("loginToken", JSON.stringify(loginToken));
    },

    loginFailure(state, err) {
      const msg = err?.response?.data?.message || err.message || "Erro ao efetuar o login";
      state.loginErrorMessage = msg;
      state.status.loggedIn = false;
      state.loginToken = null;
    },
  },
};
