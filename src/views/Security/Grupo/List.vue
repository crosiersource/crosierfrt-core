<template>
  <CrosierListS
    v-if="authStore.token"
    api-resource="/api/sec/group"
    titulo="Grupos"
    icon="fas fa-users"
    :headers="headers"
    :auth-store="authStore"
    :store="groupStore"
    form-path="/sec/grupo/form"
    list-path="/sec/grupo/list"
  >
    <template #filters>
      <VTextField
        id="filters.id"
        v-model="groupStore.filters.id"
        label="Id"
        outlined
        dense
        clearable
      />

      <VTextField v-model="groupStore.filters.groupname" label="Grupo" outlined dense clearable />
    </template>
  </CrosierListS>
</template>
<script>
import CrosierListS from '@/components/Crosier/CrosierList';
import { mapStores } from 'pinia';
import { useGroupStore } from '@/stores/Security/group.store';

export default {
  name: 'GrupoList',

  components: {
    CrosierListS,
  },

  inject: ['authStore'],

  data() {
    return {
      headers: [
        { title: 'Id', key: 'id', sortable: true },
        { title: 'Grupo', key: 'groupname' },
        { title: '', key: 'actions', sortable: false, width: '1%' },
      ],
    };
  },

  computed: {
    ...mapStores(useGroupStore),
  },
};
</script>
