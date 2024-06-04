import { defineStore } from 'pinia'

// You can name the return value of `defineStore()` anything you want,
// but it's best to use the name of the store and surround it with `use`
// and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application
export const useMenuStore = defineStore('menu', {
  state: () => {
    return {
      // all these properties will have their type inferred automatically
      drawer: false,
    }
  },
  getters: {
    getDrawer: (state) => state.drawer,
  },
  actions: {
    setDrawer(drawer) {
      this.drawer = drawer
    },
  },
})