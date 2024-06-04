<template>
  <v-navigation-drawer
    v-model="menuStore.drawer" @input="updateDrawer"
    expand-on-hover
    image="https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg"
    theme="dark"
    :location="$vuetify.display.mobile ? 'bottom' : undefined"
    temporary
  >
    <v-list v-model:opened="open" density="compact">
      <v-list-item prepend-icon="mdi-home" title="Home"></v-list-item>
      <v-list-item prepend-icon="mdi-home" title="Login" ></v-list-item>

      <v-list-group value="Users" active-color="orange">

        <v-list-item prepend-icon="mdi-home" title="Item 1"></v-list-item>

        <template v-slot:activator="{ props }">
          <v-list-item
            v-bind="props"
            prepend-icon="mdi-account-circle"
            title="Users"
          ></v-list-item>
        </template>

        <v-list-group value="Admin">
          <template v-slot:activator="{ props }">
            <v-list-item
              v-bind="props"
              title="Admin"
            ></v-list-item>
          </template>

          <v-list-item
            v-for="([title, icon], i) in admins"
            :key="i"
            :prepend-icon="icon"
            :value="title"
          >
            <v-list-item-title class="submenu-item">Sou eu</v-list-item-title>
          </v-list-item>
        </v-list-group>

        <v-list-group value="Actions">
          <template v-slot:activator="{ props }">
            <v-list-item
              v-bind="props"
              title="Actions"
            ></v-list-item>
          </template>

          <v-list-item
            v-for="([title, icon], i) in cruds"
            :key="i"
            :prepend-icon="icon"
            :title="title"
            :value="title"
          ></v-list-item>
        </v-list-group>
      </v-list-group>
    </v-list>

    <template v-slot:append>
      <div class="pa-2">
        <v-btn block>
          Sair
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script>
import { useMenuStore } from '@/stores/menu.store'
import { mapStores } from 'pinia'

export default {
  name: 'Menu',
  
  data: () => ({
    open: ['Users'],
    admins: {
      'Profile': 'mdi-account-circle',
      'Settings': 'mdi-settings',
    },
    cruds: {
      'Create': 'mdi-plus',
      'Read': 'mdi-magnify',
      'Update': 'mdi-pencil',
      'Delete': 'mdi-delete',
    },
  }),

  methods: {
    toggleSubmenu() {
      this.isSubmenuOpen = !this.isSubmenuOpen;
    },
    updateDrawer(value) {
      this.$emit('update:drawer', value);
    },
  },

  computed: {
    ...mapStores(useMenuStore)
  },
};
</script>