<template>
  <CrosierListS
    v-if="authStore.token"
    api-resource="/api/sec/user"
    titulo="Usuários"
    icon="fas fa-users"
    :headers="headers"
    :auth-store="authStore"
    :store="userStore"
    form-path="/sec/usuario/form"
    list-path="/sec/usuario/list"
  >
    <template #filters>
      <VTextField
        id="filters.id"
        v-model="userStore.filters.id"
        label="Id"
        outlined
        dense
        clearable
      />

      <VTextField
        v-model="userStore.filters.username"
        label="Nome de Usuário"
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
import { useUserStore } from "@/stores/Security/user.store";

export default {
  name: "UsuarioList",

  components: {
    CrosierListS,
  },

  inject: ["authStore"],

  data() {
    return {
      headers: [
        { title: "Id", key: "id", sortable: true },
        { title: "Usuário", key: "username" },
        { title: "", key: "actions", sortable: false, width: "1%" },
      ],
    };
  },

  computed: {
    ...mapStores(useUserStore),
  },
};
</script>
