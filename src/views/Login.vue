<template>
  <div>
    <v-img
      class="mx-auto my-6"
      src="https://www.crosier.com.br/CROSIER_400x89.png"
      max-width="200"
      max-height="50"
    ></v-img>

    <v-card class="mx-auto pa-12 pb-8" elevation="8" max-width="448" rounded="lg">
      <v-text-field
        compact
        label="Usuário"
        v-model="this.authStore.username"
        variant="outlined"
        placeholder="Nome de usuário"
        prepend-icon="fas fa-user"
      ></v-text-field>

      <v-text-field
        label="Senha"
        :append-icon="passwordVisible ? 'fas fa-eye-slash' : 'fas fa-eye'"
        :type="passwordVisible ? 'text' : 'password'"
        placeholder="Digite sua senha"
        v-model="password"
        prepend-icon="fas fa-key"
        variant="outlined"
        @click:append="passwordVisible = !passwordVisible"
      ></v-text-field>

      <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
        <a
          class="text-caption text-decoration-none text-blue"
          href="#"
          rel="noopener noreferrer"
          target="_blank"
        >
          Esqueci minha senha</a
        >
      </div>

      <v-card class="mb-12" color="surface-variant" variant="tonal" v-if="error">
        <v-card-text class="text-medium-emphasis text-caption">
          Warning: After 3 consecutive failed login attempts, you account will be temporarily locked
          for three hours. If you must login now, you can also click "Forgot login password?" below
          to reset the login password.
        </v-card-text>
      </v-card>

      <v-btn class="mb-8" color="blue" size="large" variant="outlined" block @click="login">
        Entrar
      </v-btn>

      <v-card-text class="text-center" v-if="podeCriarConta">
        <a
          class="text-blue text-decoration-none"
          href="#"
          rel="noopener noreferrer"
          target="_blank"
        >
          Sign up now <v-icon icon="mdi-chevron-right"></v-icon>
        </a>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
import { mapStores } from "pinia";
import { useAuthStore } from "@/stores/auth.store";

export default {
  name: "Login",
  data() {
    return {
      password: null,
      passwordVisible: false,
      error: false,
      podeCriarConta: false,
    };
  },
  mounted() {
    console.log("aqui eu");
    console.log(import.meta.env.VITE_CROSIER_API);
  },
  methods: {
    login() {
      this.authStore.login(this.password);
    },
  },
  computed: {
    ...mapStores(useAuthStore),
  },
};
</script>
