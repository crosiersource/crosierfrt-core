import { defineStore } from "pinia";

export const useLoadingStore = defineStore("loading", {
  state: () => {
    return {
      loading: false,
    };
  },
  getters: {
    isLoading: (state) => state.loading,
  },
  actions: {
    setLoading(loading) {
      this.loading = loading;
    },
  },
});
