<template>
  <RouterView />
</template>

<script>
import { provide } from 'vue';
import { useAuthStore } from '@/stores/auth.store.js';
import { useLoadingStore } from '@/stores/loading.store.js';

export default {
  name: 'App',
  data() {
    return {
      authStore: useAuthStore(), // Obtém a store de autenticação
      loadingStore: useLoadingStore(), // Obtém a store de autenticação
    };
  },
  created() {
    provide('authStore', this.authStore); // Fornece a store para todos os componentes filhos
    provide('loadingStore', this.loadingStore); // Fornece a store para todos os componentes filhos
  },
};
</script>
