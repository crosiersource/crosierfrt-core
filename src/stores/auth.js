import { defineStore } from 'pinia'

import api from '@/services/api.js'
import { useLayoutStore } from '@/stores/layout';
// import router from '@/router/router.js';


console.log("Vou fazer getItem do crsrTkn");
const crsrTknJson = localStorage.getItem('crsrTkn');
let crsrTkn = null;
if (crsrTknJson && crsrTknJson !== 'undefined') {
  console.log("crsrTknJson: " + crsrTknJson);
  crsrTkn = JSON.parse(crsrTknJson);
}

const API_URL = import.meta.env.VITE_CORE_URL


const initialState = () => ({
  status: {
    loggedIn: crsrTkn !== null
  },
  crsrTkn: crsrTkn,
  loginErrorMessage: null
})


export const useAuthStore = defineStore('auth', {

  state: initialState,

  getters: {
    isLoggedIn: (state) => state.status.loggedIn,

    getLoginErrorMessage: (state) => state.loginErrorMessage
  },

  actions: {
    loginSuccess(crsrTkn) {
      console.log("auth.js loginSuccess com crsrTkn: " + crsrTkn);
      this.status.loggedIn = true
      this.crsrTkn = crsrTkn
      localStorage.setItem('crsrTkn', JSON.stringify(crsrTkn))
    },

    loginFailure(err) {
      const msg = err?.response?.data?.message || err?.message || 'Erro ao efetuar o login'
      console.log('estou no loginFailure do auth.store.js')
      console.log(msg)
      this.loginErrorMessage = msg
      this.status.loggedIn = false
      this.crsrTkn = null
    },

    async login(user) {
      useLayoutStore().setLoading(true);

      try {
        const rsLogin = await api.post(API_URL + '/api/login', {
          username: user.username,
          password: user.password
        })
        console.log('>>>>rs login')
        console.log(rsLogin)

        if (rsLogin?.data?.token) {
          this.loginSuccess(rsLogin.data.token)
          console.log('deu boa o login,,,, vou pro / agora')
          // await router.push({ name: 'inicial' })
        } else {
          throw new Error('Erro ao efetuar o login.')
        }
      } catch (e) {
        console.log('cai no catch do auth.store.js login')
        this.loginFailure(e)
      }

      useLayoutStore().setLoading(false);
    }
  }

})