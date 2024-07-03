<template>
  <VBtn @click="showSnackbar"> Mostrar Snackbar </VBtn>

  <CrosierListS
    v-if="authStore.token"
    api-resource="/api/sec/group"
    titulo="Grupos"
    icon="fas fa-users"
    :headers="headers"
    :auth-store="authStore"
    :store="groupStore"
    form-path="/sec/grupo/form"
    list-path="/sec/grupo/form"
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
import CrosierListS from "@/components/Crosier/CrosierList";
import { mapStores } from "pinia";
import { useGroupStore } from "@/stores/Security/group.store";

export default {
  name: "GruposList",

  components: {
    CrosierListS,
  },

  inject: ["authStore"],

  data() {
    return {
      snackbar: false,
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

  mounted() {
    console.log("List.vue montado");
  },

  beforeUnmount() {
    console.log("List.vue desmontado");
  },

  methods: {
    showSnackbar() {
      this.snackbar = true;
    },
  },

  computed: {
    ...mapStores(useGroupStore),
  },
};
</script>
