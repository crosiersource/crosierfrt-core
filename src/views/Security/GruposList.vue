<template>
  <v-navigation-drawer v-model="drawerPesquisa" location="right" permanent width="500">
    <template v-slot:prepend>
      <v-container>
        <v-row no-gutters>
          <v-col class="d-flex justify-end align-center"
            ><v-btn
              variant="plain"
              prepend-icon="fas fa-times"
              type="button"
              @click="drawerPesquisa = false"
            ></v-btn>
          </v-col>
        </v-row>
      </v-container>
    </template>

    <v-divider></v-divider>

    <v-form fast-fail @submit.prevent="doFilterData">
      <v-text-field v-model="filters.id" type="number" label="Id"></v-text-field>

      <v-text-field v-model="filters.groupname" label="Grupo"></v-text-field>

      <v-container class="grey lighten-5">
        <v-row no-gutters>
          <v-col class="d-flex justify-end align-center"
            ><v-btn prepend-icon="fas fa-search" type="submit" color="green"
              >Pesquisar</v-btn
            ></v-col
          >

          <v-btn
            prepend-icon="far fa-times-circle"
            class="mx-2"
            type="button"
            @click="doClearFilters()"
            >Limpar</v-btn
          >
        </v-row>
      </v-container>
    </v-form>
  </v-navigation-drawer>

  <v-card flat>
    <v-card-title class="d-flex align-center pe-2">
      <v-icon icon="fas fa-people-carry"></v-icon> &nbsp; Grupos de Usuários
      <v-spacer></v-spacer>
      <VBtn
        @click="drawerPesquisa = !drawerPesquisa"
        icon="fas fa-file"
        variant="plain"
        title="Novo registro"
      ></VBtn>
      <VBtn
        @click="drawerPesquisa = !drawerPesquisa"
        icon="fas fa-search"
        variant="plain"
        title="Abrir/fechar pesquisa"
      ></VBtn>
    </v-card-title>

    <v-divider></v-divider>
    <VDataTableServer
      hover
      @update:options="doFilterData"
      v-model:items-per-page="rows"
      :items="tableData"
      item-key="id"
      v-model:page="page"
      :headers="headers"
      :items-length="totalRecords"
      :footer-props="{ 'items-per-page-options': [15, 30, 50, 100, -1] }"
      :items-per-page-options="[5, 10, 25, 50, 100, 200, 500, -1]"
    >
    </VDataTableServer>
  </v-card>
</template>
<script>
import api from "@/services/api";
import { useLoadingStore } from "@/stores/loading.store";
import { mapStores } from "pinia";
export default {
  data() {
    return {
      drawerPesquisa: false,
      tableData: [],
      headers: [
        { key: "id", title: "Id" },
        { key: "groupname", title: "Grupo" },
      ],
      rows: 10,
      page: 1,
      apiOrder: null,
      filters: {},
      defaultFilters: null,
      properties: null,
      totalRecords: 0,
    };
  },

  mounted() {},

  methods: {
    async doFilterData({ page, itemsPerPage, sortBy }) {
      const rows = itemsPerPage;
      let order = {};
      if (sortBy?.[0]?.key) {
        order[sortBy[0].key] = sortBy[0].order;
      }

      this.loadingStore.setLoading(true);
      const response = await api.get({
        apiResource: import.meta.env.VITE_CROSIER_API + "/api/sec/group",
        page,
        rows,
        order,
        filters: this.filters,
        defaultFilters: this.defaultFilters,
        properties: this.properties,
      });

      this.totalRecords = response.data["hydra:totalItems"];
      this.tableData = response.data["hydra:member"];
      this.loadingStore.setLoading(false);
    },

    doClearFilters() {
      this.filters = {};
      this.doFilterData({ page: 1, itemsPerPage: this.rows });
    },
  },

  computed: {
    ...mapStores(useLoadingStore),
  },
};
</script>
