<template>
  <VNavigationDrawer v-model="drawerPesquisa" location="right" permanent width="500">
    <template #prepend>
      <VContainer>
        <VRow no-gutters>
          <VCol class="d-flex justify-end align-center">
            <VBtn
              variant="plain"
              prepend-icon="fas fa-times"
              type="button"
              @click="drawerPesquisa = false"
            />
          </VCol>
        </VRow>
      </VContainer>
    </template>

    <VDivider />

    <VForm fast-fail @submit.prevent="doFilterData">
      <div id="divFilters" ref="divFilters">
        <slot name="filters" />
      </div>

      <VContainer class="grey lighten-5">
        <VRow no-gutters>
          <VCol class="d-flex justify-end align-center">
            <VBtn prepend-icon="fas fa-search" type="submit" color="green"> Pesquisar </VBtn>
          </VCol>

          <VBtn
            prepend-icon="far fa-times-circle"
            class="mx-2"
            type="button"
            @click="doClearFilters()"
          >
            Limpar
          </VBtn>
        </VRow>
      </VContainer>
    </VForm>
  </VNavigationDrawer>

  <VCard flat>
    <VCardTitle class="d-flex align-center pe-2">
      <VIcon :icon="icon" /> &nbsp; {{ titulo }}
      <VSpacer />

      <VBtn
        v-if="formPath"
        icon="fas fa-file"
        variant="plain"
        title="Novo registro"
        @click="$router.push({ path: formPath })"
      />

      <VBtn
        icon="fas fa-search"
        variant="plain"
        title="Abrir/fechar pesquisa"
        @click="drawerPesquisa = !drawerPesquisa"
      />
    </VCardTitle>

    <VDivider />

    <VDataTableServer
      v-if="authStore?.token"
      v-model:items-per-page="rows"
      v-model:page="page"
      hover
      :items="tableData"
      item-key="id"
      :headers="headers"
      :items-length="totalRecords"
      :footer-props="{ 'items-per-page-options': [15, 30, 50, 100, -1] }"
      :items-per-page-options="[5, 10, 25, 50, 100, 200, 500, -1]"
      @update:options="doFilterData"
    >
      <template #item.actions="{ item }">
        <div class="d-flex justify-end">
          <VIcon
            class="me-2"
            size="small"
            @click="$router.push({ path: formPath + '/' + item.id })"
          >
            fas fa-edit
          </VIcon>
          <VIcon size="small" @click="openDlgDelete(item)"> fas fa-trash </VIcon>
        </div>
        <div class="mt-1 d-flex justify-end">
          <VChip variant="plain" size="x-small">
            {{ new Date(item.updated).toLocaleString() }}
          </VChip>
        </div>
      </template>
    </VDataTableServer>

    <VDialog v-model="dlgDelete" width="auto">
      <VCard
        max-width="400"
        prepend-icon="fas fa-exclamation-triangle"
        text="Confirmar operação?"
        title="Atenção"
      >
        <template #actions>
          <VBtn class="ms-auto" text="Sim" @click="this.delete" />
          <VBtn text="Não" @click="dlgDelete = false" />
        </template>
      </VCard>
    </VDialog>
  </VCard>
</template>
<script>
import api from "@/services/api";
import Mousetrap from "mousetrap";

export default {
  name: "CrosierList",

  inject: ["authStore", "loadingStore", "snackbarStore"],

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
    console.log("CrosierList.vue montado");
    console.log("authStore");
    console.log(this.authStore);
    console.log("o form-path aqui é " + this.formPath);
    Mousetrap.bind("ctrl+k", (e) => {
      e.preventDefault();
      this.drawerPesquisa = !this.drawerPesquisa;
    });
  },

  beforeUnmount() {
    console.log("CrosierList.vue desmontado");
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

        this.totalRecords = response.data["hydra:totalItems"];
        this.tableData = response.data["hydra:member"];
      } catch (e) {
        console.log("Erro ao buscar dados");
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
      console.log("oi");
      if (this.drawerPesquisa) {
        const filtersDiv = this.$refs.divFilters;
        console.log(filtersDiv);

        if (filtersDiv) {
          // Busca pelo primeiro input dentro do 'filters'
          const firstInput = filtersDiv.querySelector("input");

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
      await this.store.delete(this.item["@id"]);
      await this.doFilterData({ page: 1, itemsPerPage: this.rows });
      this.snackbarStore.show("Registro excluído com sucesso!");
      this.dlgDelete = false;
    },
  },
};
</script>
