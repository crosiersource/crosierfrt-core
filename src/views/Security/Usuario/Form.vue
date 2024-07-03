<template>
  <CrosierForm
    :store="groupStore"
    api-resource="/api/sec/group"
    titulo="Usuário"
    icon="fas fa-users"
    list-path="/sec/grupo/list"
  >
    <template #fields>
      <VTextField
        id="groupname"
        v-model="groupStore.groupname"
        label="Grupo"
        outlined
        dense
        clearable
      />
    </template>
  </CrosierForm>
</template>
<script>
import CrosierForm from "@/components/Crosier/CrosierForm";
import { mapStores } from "pinia";
import { useGroupStore } from "@/stores/Security/group.store";

export default {
  name: "GrupoForm",

  components: {
    CrosierForm,
  },

  computed: {
    ...mapStores(useGroupStore),
  },
};
</script>
