<template>
  <CrosierBlock :loading="loading" />

  <Toast position="bottom-right" class="mb-5" />
  <ConfirmDialog />

  <router-view></router-view>
</template>

<script>
import CrosierBlock from "./components/CrosierBlock.vue";
import Toast from "primevue/toast";
import ConfirmDialog from "primevue/confirmdialog";
import { mapGetters } from "vuex";

export default {
  name: "App",

  components: {
    CrosierBlock,
    Toast,
    ConfirmDialog,
  },

  computed: {
    ...mapGetters({ loading: "layout/isLoading" }),
  },
};
</script>
