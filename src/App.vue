<template>
  <div id="app">
    <VProgressLinear
      :active="loadingStore.isLoading"
      :indeterminate="loadingStore.isLoading"
      color="deep-purple-accent-5"
      absolute
      top
    />

    <VSnackbar
      v-model="snackbarStore.showing"
      :timeout="3000"
      vertical
      :color="snackbarStore.cor"
      variant="tonal"
    >
      <div class="text-subtitle-1 pb-2 font-weight-bold">{{ snackbarStore.mensagem }}</div>
      <p v-if="snackbarStore.detalhes">{{ snackbarStore.detalhes }}</p>
    </VSnackbar>

    <div v-show="loadingStore.isLoading" id="crosierBlockDiv" class="overlay" />
    <RouterView />
  </div>
</template>
<script>
import { provide } from "vue";
import { useLoadingStore } from "@/stores/loading.store";
import { useAuthStore } from "@/stores/auth.store";
import { useSnackbarStore } from "@/stores/snackbar.store";
import { mapStores } from "pinia";

export default {
  name: "App",

  setup() {
    const authStore = useAuthStore();
    const loadingStore = useLoadingStore();
    const snackbarStore = useSnackbarStore();
    provide("authStore", authStore);
    provide("loadingStore", loadingStore);
    provide("snackbarStore", snackbarStore);
  },

  mounted() {
    this.authStore.loadAllFromLocalStorage();
    this.authStore.doRefreshToken();
  },

  computed: {
    ...mapStores(useLoadingStore, useAuthStore, useSnackbarStore),
  },
};
</script>
<style>
#crosierBlockDiv {
  z-index: 2147483646 !important;
}
.overlay {
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
  z-index: 999;
}
</style>
