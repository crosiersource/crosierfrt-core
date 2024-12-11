<template>
  <div class="card mt-4">
    <div class="card-body">
      <h5 class="card-title">Permissões</h5>

      <CrosierListS
        v-model:selection="fields.userRoles"
        :withoutCard="true"
        :comFiltragem="false"
        :comPaginador="false"
        :comExportCSV="false"
        apiResource="/api/sec/role"
        dtStateName="groupForm_rolesList"
        :ativarSelecao="true"
        :preselecao="true"
        :filtersStoreName="null"
      >
        <template #columns>
          <Column field="role" header="Role" :sortable="true" />
          <Column field="descricao" header="Descrição" :sortable="true" />
        </template>
      </CrosierListS>
    </div>
  </div>
</template>

<script>
import Column from 'primevue/column';
import CrosierListS from '@/components/crosier/CrosierListS.vue';

export default {
  name: 'RolesList',
  components: {
    CrosierListS,
    Column,
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
