import { defineStore } from "pinia";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useLoadingStore } from "./loading.store";

export const useAuthStore = defineStore("auth", {
  state: () => {
    return {
      // all these properties will have their type inferred automatically
      username: null,
      token: null,
      tokenExpiration: null,
      refreshToken: null,
      refreshTokenExpiration: null,
      error: null,
    };
  },

  getters: {
    tokenWillExpireIn: (state) => {
      if (state.tokenExpiration) {
        return state.tokenExpiration * 1000 - Date.now();
      }
      return 0;
    },

    refreshTokenWillExpireIn: (state) => {
      if (state?.refreshTokenExpiration) {
        return state.refreshTokenExpiration * 1000 - Date.now();
      }
      return 0;
    },
  },

  actions: {
    setUsername() {
      localStorage.setItem("username", this.username);
    },

    setToken(token) {
      this.token = token;
      localStorage.setItem("token", token);
      const tokenInfo = jwtDecode(token);
      this.tokenExpiration = tokenInfo.exp;
      localStorage.setItem("tokenExpiration", this.tokenExpiration);
    },

    setRefreshToken(refreshToken) {
      this.refreshToken = refreshToken;
      localStorage.setItem("refreshToken", refreshToken);
    },

    setRefreshTokenExpiration(refreshTokenExpiration) {
      this.refreshTokenExpiration = refreshTokenExpiration;
      localStorage.setItem("refreshTokenExpiration", refreshTokenExpiration);
    },

    loadAllFromLocalStorage() {
      this.username = localStorage.getItem("username");
      this.token = localStorage.getItem("token");
      this.tokenExpiration = localStorage.getItem("tokenExpiration");
      this.refreshToken = localStorage.getItem("refreshToken");
      this.refreshTokenExpiration = localStorage.getItem("refreshTokenExpiration");
    },

    isTokenExpired() {
      if (this.tokenExpiration) {
        return Date.now() >= this.tokenExpiration * 1000;
      }
      return true;
    },

    async login(password) {
      const loadingStore = useLoadingStore();
      loadingStore.setLoading(true);
      console.log("com a senha", password);
      console.log(import.meta.env.VITE_CROSIER_API);
      const delay = (ms) => new Promise((res) => setTimeout(res, ms));
      await delay(1000);
      axios
        .post(import.meta.env.VITE_CROSIER_API + "/api/login", {
          username: this.username,
          password,
        })
        .then((response) => {
          console.log("response", response);

          this.setToken(response.data.token);
          this.setRefreshToken(response.data.refresh_token);
          this.setRefreshTokenExpiration(response.data.refresh_token_expiration);

          this.setUsername();

          this.$router.push("/");
        })
        .catch((error) => {
          console.log(error);
          this.error = error?.response?.status;
        });
      loadingStore.setLoading(false);
    },

    async doRefreshToken() {
      try {
        const response = await axios.post(import.meta.env.VITE_CROSIER_API + "/api/token/refresh", {
          token: this.getToken,
          refresh_token: this.refreshToken,
        });

        console.log("response", response);

        this.setToken(response.data.token);
        this.setRefreshToken(response.data.refresh_token);
        this.setRefreshTokenExpiration(response.data.refresh_token_expiration);

        this.setUsername();
        console.log(this.tokenInfo);
      } catch (e) {
        console.error("Erro ao refrescar o token", e);
        this.$router.push("/login");
      }
    },
  },
});
