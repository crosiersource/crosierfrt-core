<template>
  <v-app-bar color="primary" prominent>
    <template v-slot:prepend>
      <v-app-bar-nav-icon @click.stop="menuStore.drawer = !menuStore.drawer"></v-app-bar-nav-icon>
    </template>

    <v-app-bar-title
      ><v-img
        src="https://www.crosier.com.br/imgs/CROSIER_branco_transp.png"
        max-width="200"
        max-height="25"
      ></v-img
    ></v-app-bar-title>

    <template v-slot:append>
      <HeaderUserMenu />
      <v-btn @click="authStore.logout()" prepend-icon="fas fa-sign-out-alt">Sair</v-btn>
    </template>
  </v-app-bar>
</template>

<script>
import { mapStores } from "pinia";
import { useMenuStore } from "@/stores/menu.store";
import { useAuthStore } from "@/stores/auth.store";
import HeaderUserMenu from "./HeaderUserMenu.vue";

export default {
  name: "Header",

  components: {
    HeaderUserMenu,
  },

  computed: {
    ...mapStores(useMenuStore),
    ...mapStores(useAuthStore),
  },
};
</script>
