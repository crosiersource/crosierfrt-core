<template>
  <v-navigation-drawer
    v-model="menuStore.drawer"
    expand-on-hover
    class="bg-deep-purple"
    theme="light"
    :location="$vuetify.display.mobile ? 'bottom' : undefined"
    temporary
  >
    <v-list density="compact">
      <!-- Iterar sobre cada item do menu -->
      <template v-for="(item, index) in menu" :key="index">
        <!-- Verificar se o item possui subitems -->
        <v-list-item
          v-if="!item.subitems"
          :prepend-icon="item.icon"
          :title="item.label"
          @click="$router.push({ path: item.path })"
        ></v-list-item>

        <!-- Renderizar v-list-group se houver subitems -->
        <v-list-group v-else :value="expandedGroups.includes(index)" v-model="expandedGroups">
          <template v-slot:activator="{ props }">
            <v-list-item v-bind="props" :prepend-icon="item.icon" :title="item.label"></v-list-item>
          </template>

          <!-- Iterar sobre subitems dentro do v-list-group -->
          <v-list-item
            v-for="(subitem, subIndex) in item.subitems"
            :key="subIndex"
            :to="subitem.path"
            :prepend-icon="subitem.icon"
            :title="subitem.label"
            @click="$router.push({ path: subitem.path })"
          ></v-list-item>
        </v-list-group>
      </template>
    </v-list>

    <template v-slot:append>
      <div class="pa-2">
        <v-btn block @click="logout">Sair</v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script>
import { useMenuStore } from "@/stores/menu.store";
import { mapStores } from "pinia";

export default {
  name: "Menu",

  data() {
    return {
      menu: [
        { icon: "fas fa-home", label: "Home", path: "/" },
        { icon: "fas fa-help", label: "Sobre", path: "/about" },
        {
          icon: "fas fa-cogs",
          label: "Settings",
          subitems: [
            { icon: "fas fa-user", label: "Usuários", path: "/users" },
            { icon: "fas fa-key", label: "Grupos", path: "/grupos" },
          ],
        },
      ],
      expandedGroups: [], // Estado para rastrear grupos expandidos
    };
  },

  methods: {
    toggleGroup(index) {
      console.log("vou toglar", index);
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
      console.log("vou watchar...", newVal);
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
.v-list-item-title {
  font-size: 0.8125rem;
  font-weight: 500;
  letter-spacing: normal;
  line-height: 1rem;
}
</style>
