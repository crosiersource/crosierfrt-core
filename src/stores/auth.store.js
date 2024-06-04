import { defineStore } from "pinia";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const useAuthStore = defineStore("auth", {
  state: () => {
    return {
      // all these properties will have their type inferred automatically
      username: null,
      token: null,
      tokenInfo: null,
    };
  },

  getters: {
    getUsername: (state) => state.username,
    getToken: (state) => state.token,
    getTokenInfo: (state) => state.tokenInfo,
  },

  actions: {
    setUsername(username) {
      this.username = username;
    },

    setToken(token) {
      this.token = token;
      this.tokenInfo = jwtDecode(token);
    },

    login(password) {
      console.log("vou fazer login para o usuário", this.username);
      console.log("com a senha", password);
      console.log(import.meta.env.VITE_CROSIER_API);
      axios
        .post(import.meta.env.VITE_CROSIER_API + "/api/login", {
          username: this.username,
          password,
        })
        .then((response) => {
          console.log(response);
          this.setToken(response.data.token);
          console.log(this.tokenInfo);
          this.$router.push("/");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
});
