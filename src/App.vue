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
      authStore: useAuthStore(),
      loadingStore: useLoadingStore(),
    };
  },
  created() {
    provide('authStore', this.authStore);
    provide('loadingStore', this.loadingStore);
  },
};
</script>
