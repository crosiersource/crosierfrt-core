<template>
  <VApp @mousemove="handleMouseMove">
    <VLayout>
      <Menu />

      <Header />

      <VMain>
        <VCardText>
          <RouterView />
        </VCardText>
      </VMain>
    </VLayout>
  </VApp>
</template>

<script>
import Menu from "./Menu.vue";
import Header from "./Header.vue";
import { mapStores } from "pinia";
import { useMenuStore } from "@/stores/menu.store";

export default {
  name: "MainLayout",

  components: {
    Menu,
    Header,
  },

  data() {
    return {
      drawer: false,
    };
  },

  methods: {
    handleMouseMove(event) {
      if (event.clientX <= 30) {
        this.menuStore.drawer = true;
      } else if (event.clientX > 250) {
        this.menuStore.drawer = false;
      }
    },
  },

  computed: {
    ...mapStores(useMenuStore),
  },
};
</script>
