<template>
  <h1>Home</h1>
  <p>Username: {{ authStore.username }}</p>
  <p>Token: {{ authStore.token }}</p>
  <p>Token Expiration: {{ tokenWillExpireIn }} ({{ authStore.tokenExpiration }})</p>
  <p>Expirado? {{ authStore.isTokenExpired() }}</p>
  <p>Refresh Token: {{ authStore.refreshToken }}</p>
  <p>
    Refresh Token Expiration: <b>{{ refreshTokenWillExpireIn }}</b>
  </p>
  <button @click="authStore.doRefreshToken">Refresh</button>
  <p>
    <RouterLink to="/settings">Settings</RouterLink>
  </p>
</template>

<script>
import { mapStores } from "pinia";
import { useAuthStore } from "@/stores/auth.store";

export default {
  name: "Home",
  computed: {
    ...mapStores(useAuthStore),
    tokenWillExpireIn() {
      return this.authStore.tokenExpiration * 1000 - this.currentTime;
    },
    refreshTokenWillExpireIn() {
      return this.authStore.refreshTokenExpiration * 1000 - this.currentTime;
    },
  },
  data() {
    return {
      intervalId: null,
      currentTime: Date.now(),
    };
  },
  mounted() {
    this.intervalId = setInterval(() => {
      this.currentTime = Date.now();
    }, 1000);
  },
  beforeUnmount() {
    clearInterval(this.intervalId);
  },
};
</script>
