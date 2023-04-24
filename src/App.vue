<template>
  <CrosierBlock :loading="this.layoutStore.isLoading" />

  <Toast position="bottom-right" class="mb-5" />

  <ConfirmDialog />

  <router-view></router-view>
</template>

<script>
import CrosierBlock from "@/components/CrosierBlock.vue";
import Toast from "primevue/toast";
import ConfirmDialog from "primevue/confirmdialog";

import { useLayoutStore } from '@/stores/layout'

export default {
  name: "App",

  components: {
    CrosierBlock,
    Toast,
    ConfirmDialog,
  },

  setup() {
    const layoutStore = useLayoutStore()
    return { layoutStore }
  },


};
</script>
