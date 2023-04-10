<template>
  <CrosierBlock :loading="loading" />
  <router-view></router-view>
</template>
<script>
import CrosierBlock from "./components/crosierBlock.vue";
import { mapGetters } from "vuex";
export default {
  name: "App",
  components: {
    CrosierBlock,
  },
  computed: {
    ...mapGetters({ loading: "layout/isLoading" }),
  },
};
</script>
