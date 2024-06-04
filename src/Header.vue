<template>
  <v-app-bar color="primary" prominent>
    <v-app-bar-nav-icon
      variant="text"
      @click.stop="menuStore.drawer = !menuStore.drawer"
    ></v-app-bar-nav-icon>

    <v-toolbar-title>
      <v-img
        src="https://www.crosier.com.br/imgs/CROSIER_branco_transp.png"
        max-width="200"
        max-height="50"
      ></v-img>
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <template v-if="$vuetify.display.mdAndUp">
      <v-btn icon="mdi-magnify" variant="text"></v-btn>

      <v-btn icon="mdi-filter" variant="text"></v-btn>
    </template>

    <v-btn icon="mdi-dots-vertical" variant="text"></v-btn>
  </v-app-bar>
</template>

<script>
import { mapStores } from "pinia";
import { useMenuStore } from "@/stores/menu.store";

export default {
  name: "Header",

  computed: {
    ...mapStores(useMenuStore),
  },
};
</script>
