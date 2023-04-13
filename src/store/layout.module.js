import api from "@/services/api.js";

export const layout = {
  namespaced: true,

  state() {
    return {
      loading: 0,
      onMobile: false,
      menuCollapsed: false,
    };
  },

  getters: {
    isLoading: (state) => state.loading > 0,

    getLoadingCount: (state) => state.loading,

    isOnMobile: (state) => state.onMobile,

    isMenuCollapsed: (state) => state.menuCollapsed,
  },

  mutations: {
    setLoading(state, loading) {
      console.log("me chamaram com o valor: " + loading);
      if (state.loading < 0) {
        state.loading = 0;
      }
      if (loading) {
        state.loading++;
      } else {
        state.loading--;
      }
    },

    setOnMobile(state, onMobile) {
      state.onMobile = onMobile;
    },

    setMenuCollapsed(state, menuCollapsed) {
      console.log("chamou o setMenuCollapsed com o valor: " + menuCollapsed);
      state.menuCollapsed = menuCollapsed;
    },
  },

  actions: {
    async buildMenuByUrl() {
      console.log("Olá, estou no buildMenu");
      const apiUrl = "https://core.crosier.dev/api/cfg/entMenu/getMenuByUrl";
      const response = await api.get(apiUrl, { url: window.location.href });
      console.log("responseeee");
      console.log(response);
      return response.data.DATA.menu;
    },
  },
};
