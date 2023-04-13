import AuthService from "@/services/auth-service.js";
import router from "@/router/router.js";

const crsrTkn = JSON.parse(localStorage.getItem("crsrTkn"));

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

      let rsLogin = null;
      try {
        rsLogin = await AuthService.login(user);

        console.log(">>>>rs login");
        console.log(rsLogin);

        if (rsLogin?.data?.token) {
          commit("loginSuccess", rsLogin.data.token);
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
    loginSuccess(state, crsrTkn) {
      state.status.loggedIn = true;
      state.crsrTkn = crsrTkn;
      localStorage.setItem("crsrTkn", JSON.stringify(crsrTkn));
    },

    loginFailure(state, err) {
      const msg = err?.response?.data?.message || err.message || "Erro ao efetuar o login";
      state.loginErrorMessage = msg;
      state.status.loggedIn = false;
      state.crsrTkn = null;
    },
  },
};
