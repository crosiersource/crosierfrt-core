import { defineStore } from 'pinia';
import { useLoadingStore } from '@/stores/loading.store.js';
import { useAuthStore } from '@/stores/auth.store.js';
import api from '@/services/api.js';

// You can name the return value of `defineStore()` anything you want,
// but it's best to use the name of the store and surround it with `use`
// and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application
export const useMenuStore = defineStore('menu', {
  state: () => {
    return {
      // all these properties will have their type inferred automatically
      menu: null,
    };
  },
  getters: {
    getMenu: (state) => state.menu,
  },
  actions: {
    async load() {
      const loadingStore = useLoadingStore();
      loadingStore.setLoading(true);

      console.log('iniciando load do menu...');

      try {
        const authStore = useAuthStore();
        console.log('authStore.token', authStore.token);

        const response = await api.get({
          authToken: authStore.token,
          apiResource: `${import.meta.env.VITE_CROSIER_API}/api/cfg/menuItem?exists[pai]=false&order[ordem]=ASC&order[items.ordem]=ASC`,
        });

        if (response.data['hydra:member']) {
          function transformMenuData(menuData) {
            return menuData.map((item) => {
              const menuItem = {
                label: item.label,
                icon: item.icon || '',
                to: item.url || null,
              };

              // Se houver sub-itens, processa recursivamente
              if (item.items && item.items.length > 0) {
                menuItem.items = transformMenuData(item.items);
              }

              return menuItem;
            });
          }
          this.menu = transformMenuData(response.data['hydra:member']);
        } else {
          console.error('Id não encontrado');
        }
      } catch (err) {
        console.error(err);
      }

      loadingStore.setLoading(false);
    },
  },
});
