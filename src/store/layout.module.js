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

    isOnMobile: (state) => state.onMobile,

    isMenuCollapsed: (state) => state.menuCollapsed,
  },

  mutations: {
    setLoading(state, loading) {
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
};
