<template>
  <VAppBar
    color="primary"
    prominent
  >
    <template #prepend>
      <VAppBarNavIcon @click.stop="menuStore.drawer = !menuStore.drawer" />
    </template>

    <VAppBarTitle>
      <VImg
        src="https://www.crosier.com.br/imgs/CROSIER_branco_transp.png"
        max-width="200"
        max-height="25"
      />
    </VAppBarTitle>

    <template #append>
      <HeaderUserMenu />
      <VBtn
        prepend-icon="fas fa-sign-out-alt"
        @click="authStore.logout()"
      >
        Sair
      </VBtn>
    </template>
  </VAppBar>
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
