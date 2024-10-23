<template>
  <CrosierForm
    :store="userStore"
    titulo="Usuário"
    icon="fas fa-users"
    list-path="/sec/usuario/list">
    <template #fields>
      <VTextField
        id="username"
        v-model="userStore.fields.username"
        label="Nome de Usuário"
        outlined
        dense
        clearable />
    </template>
  </CrosierForm>
</template>
<script>
import CrosierForm from '@/components/Crosier/CrosierForm';
import { mapStores } from 'pinia';
import { useUserStore } from '@/stores/Security/user.store';

export default {
  name: 'UsuarioForm',

  components: {
    CrosierForm
  },

  computed: {
    ...mapStores(useUserStore)
  }
};
</script>
