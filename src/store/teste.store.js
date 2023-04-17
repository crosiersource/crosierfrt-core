export const teste = {
  namespaced: true,

  state() {
    return {
      loading: 0,
      fields: {},
      fieldsErrors: {},
    };
  },

  getters: {
    isLoading: (state) => state.loading > 0,

    getFields: (state) => state.fields,
    getFieldsErrors: (state) => state.fieldsErrors,
  },

  mutations: {
    setLoading(state, loading) {
      if (loading) {
        state.loading++;
      } else {
        state.loading--;
      }
    },

    setFields(state, fields) {
      state.fields = fields;
    },

    setFieldsErrors(state, formErrors) {
      state.fieldsErrors = formErrors;
    },
  },

  actions: {
    async loadData(context) {
      context.commit("setLoading", true);

      context.commit("setLoading", false);
    },
  },
};
