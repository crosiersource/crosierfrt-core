<template>
  <div id="app">
    <v-progress-linear
      :active="this.loadingStore.isLoading"
      :indeterminate="this.loadingStore.isLoading"
      color="deep-purple-accent-5"
      absolute
      top
    ></v-progress-linear>
    <div v-show="this.loadingStore.isLoading" class="overlay" id="crosierBlockDiv"></div>
    <router-view></router-view>
  </div>
</template>
<script>
import { useLoadingStore } from "@/stores/loading.store";
import { mapStores } from "pinia";

export default {
  name: "App",

  computed: {
    ...mapStores(useLoadingStore),
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
