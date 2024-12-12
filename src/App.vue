<template>
  <RouterView />
  <div class="form-row" style="display: none">
    <div data-v-b3adfaf3="" class="col-span-4">1</div>
    <div data-v-81ea172c="" class="col-span-3"> 1 </div>
    <div data-v-0f9d882a="" class="col-span-1">1</div>
    <div data-v-b73d6386="" class="col-span-4"> 1 </div>
  </div>
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
