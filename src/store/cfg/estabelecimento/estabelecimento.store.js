import api from "@/services/api.js";
import router from "@/router/router.js";

export const cfg_estabelecimento = {
  namespaced: true,

  state() {
    return {
      filters: {},
      fields: {},
      fieldsErrors: {},
    };
  },

  mutations: {
    setFilters(state, filters) {
      state.filters = filters;
    },

    setFields(state, fields) {
      state.fields = fields;
    },

    setFieldsErrors(state, formErrors) {
      state.fieldsErrors = formErrors;
    },
  },

  getters: {
    getFilters: (state) => state.filters,

    getFields: (state) => state.fields,

    getFieldsErrors: (state) => state.fieldsErrors,
  },

  actions: {
    async loadData(context) {
      context.commit("layout/setLoading", true, { root: true });

      const id = router.currentRoute.value.query.id;

      if (id) {
        try {
          const response = await api.get(
            `${import.meta.env.VITE_CORE_URL}/api/cfg/estabelecimento/${id}`
          );

          console.log("fui lá e peguei...");
          console.dir(response);

          if (response.data["@id"]) {
            context.commit("setFields", response.data);
          } else {
            console.error("Id não encontrado");
          }
        } catch (err) {
          console.error(err);
        }
      }
      context.commit("layout/setLoading", false, { root: true });
    },
  },
};
