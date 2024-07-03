<template>
  <div id="app">
    <VProgressLinear
      :active="loadingStore.isLoading"
      :indeterminate="loadingStore.isLoading"
      color="deep-purple-accent-5"
      absolute
      top
    />
    <div
      v-show="loadingStore.isLoading"
      id="crosierBlockDiv"
      class="overlay"
    />
    <RouterView />
  </div>
</template>
<script>
import { provide } from "vue";
import { useLoadingStore } from "@/stores/loading.store";
import { useAuthStore } from "@/stores/auth.store";
import { mapStores } from "pinia";

export default {
  name: "App",

  setup() {
    const authStore = useAuthStore();
    const loadingStore = useLoadingStore();
    console.log("Proved authStore:", authStore);
    provide("authStore", authStore);
    provide("loadingStore", loadingStore);
    return { authStore }; // Retornar para uso no template
  },

  mounted() {
    this.authStore.loadAllFromLocalStorage();
    this.authStore.doRefreshToken();
  },

  computed: {
    ...mapStores(useLoadingStore, useAuthStore),
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
