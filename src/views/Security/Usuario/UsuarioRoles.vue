<template>
  <Panel class="mt-3">
    <template #header>
      <div class="text-xl font-semibold m-0">Permissões</div>
    </template>

    <CrosierListS
      v-model:selection="userStore.fields.userRoles"
      semCard
      :comFiltragem="false"
      :comPaginador="false"
      :comExportCSV="false"
      apiResource="/api/sec/role"
      dtStateName="groupForm_rolesList"
      :filtersStoreName="null"
      ativarSelecao
      preselecao
    >
      <template #columns>
        <Column field="role" header="Role" :sortable="true" />
        <Column field="descricao" header="Descrição" :sortable="true" />
      </template>
    </CrosierListS>
  </Panel>
</template>

<script>
import Column from 'primevue/column';
import CrosierListS from '@/components/crosier/CrosierListS.vue';
import { useUserStore } from '@/stores/Security/user.store';
import { mapStores } from 'pinia';
import { useLoadingStore } from '@/stores/loading.store.js';

export default {
  name: 'RolesList',
  components: {
    CrosierListS,
    Column,
  },

  computed: {
    ...mapStores(useUserStore, useLoadingStore),
  },

  data() {
    return {
      formUrl: '/v/sec/group/form',
      selection: {
        sel: [],
      },
    };
  },

  methods: {},
};
</script>
