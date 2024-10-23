import { defineStore } from 'pinia';
import api from '@/services/api';
import { submitForm } from '@/services/SubmitForm';
import * as yup from 'yup';
import { useAuthStore } from '@/stores/auth.store';
import { useLoadingStore } from '@/stores/loading.store';

export const useGroupStore = defineStore('group', {
  state: () => {
    return {
      filters: {},

      fields: {},
      fieldsErrors: {},

      schemaValidator: [],
    };
  },

  getters: {
    getFilters: (state) => state.filters,

    getFields: (state) => state.fields,

    getFieldsErrors: (state) => state.fieldsErrors,
  },

  actions: {
    async load(id) {
      const loadingStore = useLoadingStore();
      loadingStore.setLoading(true);

      console.log('vou load no groupStore');

      try {
        const authStore = useAuthStore();
        console.log('authStore.token', authStore.token);

        const response = await api.get({
          authToken: authStore.token,
          apiResource: `${import.meta.env.VITE_CROSIER_API}/api/sec/group/${id}`,
        });

        if (response.data['@id']) {
          this.fields = response.data;
        } else {
          console.error('Id não encontrado');
        }
      } catch (err) {
        console.error(err);
      }

      loadingStore.setLoading(false);
    },

    async save() {
      const loadingStore = useLoadingStore();
      loadingStore.setLoading(true);

      const schemaValidator = yup.object().shape({
        groupname: yup.string().required().typeError(),
      });

      const authStore = useAuthStore();

      try {
        const rs = await submitForm({
          apiResource: `${import.meta.env.VITE_CROSIER_API}/api/sec/group`,
          schemaValidator,
          $store: this,
          authToken: authStore.token,
          fnBeforeSave: (formData) => {
            delete formData.estabelecimentoId;
            delete formData.userInsertedId;
            delete formData.userUpdatedId;
            if (formData.roles) {
              formData.roles = formData.roles.map((e) => e['@id']);
            }
            console.log('fnBeforeSave');
            console.log(formData);
          },
        });

        console.log('Retornando do submitForm');
        console.log(rs);
      } catch (e) {
        console.log('Erro no submitForm');
        console.error(e);
        throw e;
      } finally {
        loadingStore.setLoading(false);
      }
    },

    async delete(apiResource) {
      const loadingStore = useLoadingStore();
      loadingStore.setLoading(true);

      const authStore = useAuthStore();

      apiResource = import.meta.env.VITE_CROSIER_API + apiResource;

      await api.delete(apiResource, authStore.token);

      loadingStore.setLoading(false);
    },
  },
});
