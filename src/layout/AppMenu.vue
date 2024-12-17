<template>
  <ul class="layout-menu">
    <template v-for="(item, i) in model" :key="item">
      <AppMenuItem :item="item" root :index="i" />
      <li class="menu-separator" />
    </template>
  </ul>
</template>

<script>
import { ref } from 'vue';
import AppMenuItem from './AppMenuItem.vue';
import { useMenuStore } from '@/stores/menu.store';

export default {
  name: 'AppMenu',

  components: {
    AppMenuItem,
  },

  data() {
    return {
      model: [],
    };
  },

  async mounted() {
    const menuStore = useMenuStore();

    await menuStore.load();
    console.log('menuStore.menu', menuStore.menu);
    this.model = menuStore.menu;

    // const crosierMenu = [
    //   {
    //     label: 'Inicial',
    //     icon: 'pi pi-home',
    //     to: '/',
    //   },
    //   {
    //     label: 'Configurações',
    //     icon: 'fas fa-cogs',
    //     items: [
    //       {
    //         label: 'Usuários',
    //         icon: 'fas fa-users',
    //         to: '/sec/usuario/list',
    //       },
    //     ],
    //   },
    // ];
    //
    // const model = ref(crosierMenu);
    //
    // return {
    //   model,
    // };
  },
};
</script>
