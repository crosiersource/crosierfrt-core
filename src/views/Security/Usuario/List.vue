<template>
  <CrosierListS
    api-resource="/api/sec/group"
    titulo="Grupos"
    icon="fas fa-users"
    :headers="headers"
    :store="groupStore"
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

      <VTextField
        v-model="groupStore.filters.groupname"
        label="Grupo"
        outlined
        dense
        clearable
      />
    </template>
  </CrosierListS>
</template>
<script>
import CrosierListS from "@/components/Crosier/CrosierList";
import { mapStores } from "pinia";
import { useGroupStore } from "@/stores/Security/group.store";
export default {
  name: "GruposList",
  components: {
    CrosierListS,
  },
  data() {
    return {
      headers: [
        { text: "Id", value: "id" },
        { text: "Grupo", value: "groupname" },
      ],
      filters: {
        id: "",
        groupname: "",
      },
    };
  },
  computed: {
    ...mapStores(useGroupStore),
  },
};
</script>
