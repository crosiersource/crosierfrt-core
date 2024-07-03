<template>
  <div>
    <VImg
      class="mx-auto my-6"
      src="https://www.crosier.com.br/CROSIER_400x89.png"
      max-width="200"
      max-height="50"
    />

    <VCard
      class="mx-auto pa-12 pb-8"
      elevation="8"
      max-width="448"
      rounded="lg"
    >
      <VAlert
        v-if="authStore.error === 401"
        text="Usuário/senha não encontrados."
        class="p-5 mb-5"
        title="Atenção!"
        type="warning"
      />

      <VTextField
        v-model="authStore.username"
        density="compact"
        label="Usuário"
        variant="outlined"
        placeholder="Nome de usuário"
        prepend-icon="fas fa-user"
      />

      <VTextField
        v-model="password"
        density="compact"
        label="Senha"
        :append-icon="passwordVisible ? 'fas fa-eye-slash' : 'fas fa-eye'"
        :type="passwordVisible ? 'text' : 'password'"
        placeholder="Digite sua senha"
        prepend-icon="fas fa-key"
        variant="outlined"
        @click:append="passwordVisible = !passwordVisible"
      />

      <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
        <a
          class="text-caption text-decoration-none text-blue"
          href="#"
          rel="noopener noreferrer"
          target="_blank"
        >
          Esqueci minha senha</a>
      </div>

      <VCard
        v-if="error"
        class="mb-12"
        color="surface-variant"
        variant="tonal"
      >
        <VCardText class="text-medium-emphasis text-caption">
          Warning: After 3 consecutive failed login attempts, you account will be temporarily locked
          for three hours. If you must login now, you can also click "Forgot login password?" below
          to reset the login password.
        </VCardText>
      </VCard>

      <VBtn
        class="mb-8"
        color="blue"
        size="large"
        variant="outlined"
        block
        @click="login"
      >
        Entrar
      </VBtn>

      <VCardText
        v-if="podeCriarConta"
        class="text-center"
      >
        <a
          class="text-blue text-decoration-none"
          href="#"
          rel="noopener noreferrer"
          target="_blank"
        >
          Sign up now <VIcon icon="mdi-chevron-right" />
        </a>
      </VCardText>
    </VCard>
  </div>
</template>
<script>
import { mapStores } from "pinia";
import { useAuthStore } from "@/stores/auth.store";
import { useLoadingStore } from "@/stores/loading.store";

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
  methods: {
    login() {
      this.authStore.login(this.password);
    },
  },
  computed: {
    ...mapStores(useAuthStore, useLoadingStore),
  },
};
</script>
