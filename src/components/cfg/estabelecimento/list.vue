<template>
  <Layout>
    <template #content>
      <CrosierListS
        ref="dt"
        titulo="Estabelecimentos"
        :api-resource="apiResource"
        filters-store-name="cfg/estabelecimento"
      >
        <template #columns>
          <Column field="id" header="Id" :sortable="true">
            <template #body="r">
              {{ ("00000000" + r.data.id).slice(-8) }}
            </template>
          </Column>

          <Column field="codigo" header="Código" :sortable="true"></Column>

          <Column field="descricao" header="Descrição" :sortable="true"></Column>

          <Column field="updated" header="" :sortable="true">
            <template #body="r">
              <div class="d-flex justify-content-end">
                <router-link
                  role="button"
                  class="btn btn-primary btn-sm"
                  title="Editar registro"
                  :to="'form?id=' + r.data.id"
                >
                  <i class="fas fa-wrench" aria-hidden="true"></i>
                </router-link>
                <a
                  role="button"
                  class="btn btn-danger btn-sm ml-1"
                  title="Deletar registro"
                  @click="$refs.dt.deletar(r.data.id)"
                  ><i class="fas fa-trash" aria-hidden="true"></i
                ></a>
              </div>
              <div class="d-flex justify-content-end mt-1">
                <span
                  v-if="r.data.updated"
                  class="badge badge-info"
                  title="Última alteração do registro"
                >
                  {{ new Date(r.data.updated).toLocaleString() }}
                </span>
              </div>
            </template>
          </Column>
        </template>
      </CrosierListS>
    </template>
  </Layout>
</template>

<script>
import { mapGetters } from "vuex";
import CrosierListS from "../../../components/CrosierListS.vue";
import Column from "primevue/column";
import Layout from "../../../layout/Layout.vue";

export default {
  name: "EstabelecimentoList",

  components: {
    CrosierListS,
    Column,
    Layout,
  },

  computed: {
    ...mapGetters({ filters: "cfg_estabelecimento/getFilters" }),

    apiResource() {
      return import.meta.env.VITE_CORE_URL + "/api/cfg/estabelecimento";
    },
  },
};
</script>
<script setup></script>
