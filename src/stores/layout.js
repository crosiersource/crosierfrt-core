import { defineStore } from 'pinia'

import api from '@/services/api.js'

export const useLayoutStore = defineStore('layout', {
  state: () => (
    {
      loading: 0,
      onMobile: false,
      menuCollapsed: false
    }
  ),

  getters: {
    isLoading: (state ) => state.loading > 0,

    getLoadingCount: (state) => state.loading,

    isOnMobile: (state) => state.onMobile,

    isMenuCollapsed: (state) => state.menuCollapsed
  },

  actions: {
    setLoading(loading) {
      if (this.loading < 0) {
        this.loading = 0
      }
      if (loading) {
        this.loading++
      } else {
        this.loading--
      }
    },

    setOnMobile(onMobile) {
      this.onMobile = onMobile
    },

    setMenuCollapsed(menuCollapsed) {
      console.log('chamou o setMenuCollapsed com o valor: ' + menuCollapsed)
      this.menuCollapsed = menuCollapsed
    },

    async buildMenuByUrl() {
      console.log('Olá, estou no buildMenu')
      const apiUrl = 'https://core.crosier.dev/api/cfg/entMenu/getMenuByUrl'
      const response = await api.get(apiUrl, { url: window.location.href })
      console.log('responseeee')
      console.log(response)
      return response?.data?.DATA?.menu
    }
  }
})