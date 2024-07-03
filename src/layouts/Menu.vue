<template>
  <VNavigationDrawer
    v-model="menuStore.drawer"
    expand-on-hover
    class="bg-deep-purple"
    theme="light"
    :location="$vuetify.display.mobile ? 'bottom' : undefined"
    temporary
  >
    <VList density="compact">
      <template
        v-for="(item, index) in menu"
        :key="index"
      >
        <VListItem
          v-if="!item.subitems"
          :prepend-icon="item.icon"
          :title="item.label"
          @click="$router.push({ path: item.path })"
        />

        <VListGroup
          v-else
          v-model="expandedGroups"
          :value="expandedGroups.includes(index)"
        >
          <template #activator="{ props }">
            <VListItem
              v-bind="props"
              :prepend-icon="item.icon"
              :title="item.label"
            />
          </template>

          <VListItem
            v-for="(subitem, subIndex) in item.subitems"
            :key="subIndex"
            :to="subitem.path"
            :prepend-icon="subitem.icon"
            :title="subitem.label"
            @click="$router.push({ path: subitem.path })"
          />
        </VListGroup>
      </template>
    </VList>
  </VNavigationDrawer>
</template>

<script>
import { mapStores } from "pinia";
import { useMenuStore } from "@/stores/menu.store";

export default {
  name: "Menu",

  data() {
    return {
      menu: [
        { icon: "fas fa-home", label: "Home", path: "/" },
        { icon: "fas fa-help", label: "Sobre", path: "/about" },
        {
          icon: "fas fa-cogs",
          label: "Configurações",
          subitems: [
            { icon: "fas fa-user", label: "Usuários", path: "/sec/usuario/list" },
            { icon: "fas fa-people-carry", label: "Grupos de Usuários", path: "/sec/grupo/list" },
          ],
        },
      ],
      expandedGroups: [], // Estado para rastrear grupos expandidos
    };
  },

  methods: {
    toggleGroup(index) {
      // Adiciona ou remove o índice do grupo expandido
      if (this.expandedGroups.includes(index)) {
        this.expandedGroups = this.expandedGroups.filter((i) => i !== index);
      } else {
        this.expandedGroups.push(index);
      }
    },
    logout() {
      // Lógica de logout, se necessário
    },
  },

  computed: {
    ...mapStores(useMenuStore),
  },

  watch: {
    "menuStore.drawer"(newVal) {
      // Sincronizar estado do expandedGroups quando o drawer muda
      if (!newVal) {
        // Fechar todos os grupos quando o drawer é fechado
        this.expandedGroups = [];
      }
    },
  },
};
</script>

<style scoped>
.v-list-group__items .v-list-item {
  padding-inline-start: 16px !important; /* Anula o estilo padrão */
}
</style>
