<template></template>
<script>
import api from '@/services/api';
import Mousetrap from 'mousetrap';

export default {
  name: 'CrosierList',

  inject: ['authStore', 'loadingStore', 'snackbarStore'],

  props: {
    apiResource: {
      type: String,
      required: true,
    },
    titulo: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    headers: {
      type: Array,
      required: true,
    },
    filters: {
      type: Object,
      default: () => ({}),
    },
    store: {
      type: Object,
    },
    formPath: {
      type: String,
    },
  },

  data() {
    return {
      drawerPesquisa: false,
      tableData: [],
      rows: 10,
      page: 1,
      apiOrder: null,
      defaultFilters: null,
      properties: null,
      totalRecords: 0,
      dlgDelete: false,
      item: null,
    };
  },

  watch: {
    drawerPesquisa(newValue) {
      this.onToggleDrawerPesquisa(newValue);
    },
  },

  mounted() {
    console.log('CrosierList.vue montado');
    console.log('authStore');
    console.log(this.authStore);
    console.log('o form-path aqui é ' + this.formPath);
    Mousetrap.bind('ctrl+k', (e) => {
      e.preventDefault();
      this.drawerPesquisa = !this.drawerPesquisa;
    });
  },

  beforeUnmount() {
    console.log('CrosierList.vue desmontado');
  },

  methods: {
    async doFilterData({ page, itemsPerPage, sortBy }) {
      const rows = itemsPerPage;
      const order = {};
      if (sortBy?.[0]?.key) {
        order[sortBy[0].key] = sortBy[0].order;
      }

      this.loadingStore.setLoading(true);

      try {
        const response = await api.get({
          apiResource: import.meta.env.VITE_CROSIER_API + this.apiResource,
          authToken: this.authStore.token,
          page,
          rows,
          order,
          filters: this.store?.filters,
          defaultFilters: this.defaultFilters,
          properties: this.properties,
        });

        this.totalRecords = response.data['hydra:totalItems'];
        this.tableData = response.data['hydra:member'];
      } catch (e) {
        console.log('Erro ao buscar dados');
        console.log(e);
        console.log(e?.response?.data?.message);
        if (e?.response?.status === 401) {
          //this.$router.push({ path: "/login" });
        }
      }

      this.loadingStore.setLoading(false);
    },

    doClearFilters() {
      this.store.filters = {};
      this.doFilterData({ page: 1, itemsPerPage: this.rows });
      this.drawerPesquisa = false;
    },

    onToggleDrawerPesquisa() {
      console.log('oi');
      if (this.drawerPesquisa) {
        const filtersDiv = this.$refs.divFilters;
        console.log(filtersDiv);

        if (filtersDiv) {
          // Busca pelo primeiro input dentro do 'filters'
          const firstInput = filtersDiv.querySelector('input');

          // Se encontrar um input, define o foco nele
          if (firstInput) {
            firstInput.focus();
          }
        }
      }
    },

    openDlgDelete(item) {
      this.item = item;
      this.dlgDelete = true;
    },

    async delete() {
      await this.store.delete(this.item['@id']);
      await this.doFilterData({ page: 1, itemsPerPage: this.rows });
      this.snackbarStore.show('Registro excluído com sucesso!');
      this.dlgDelete = false;
    },
  },
};
</script>
