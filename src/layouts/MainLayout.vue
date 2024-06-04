<template>
  <v-app @mousemove="handleMouseMove">
    <v-layout>
      <Menu />

      <Header />

      <v-main style="height: 500px">
        <v-card-text>
          <router-view></router-view>
        </v-card-text>
      </v-main>
    </v-layout>
  </v-app>
</template>

<script>
import Menu from "@/Menu.vue";
import Header from "@/Header.vue";
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
      if (event.clientX <= 5) {
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

<style>
.v-list-group__items .v-list-item {
  padding-inline-start: 16px !important; /* Anula o estilo padrão */
}
.submenu-item {
  margin-left: 16px; /* Ajuste a margem conforme necessário */
}
</style>
