<template>
  <div class="h-screen flex w-full bg-surface-50 dark:bg-surface-950">
    <div class="flex flex-1 flex-col bg-surface-50 dark:bg-surface-950 items-center justify-center">
      <div class="w-11/12 sm:w-[30rem]">
        <div class="flex flex-col">
          <div
            style="height: 56px; width: 56px"
            class="bg-primary-50 rounded-full flex items-center justify-center"
          >
            <i class="pi pi-sign-in text-primary !text-4xl" />
          </div>
          <div class="mt-6">
            <h1 class="m-0 text-primary font-semibold text-4xl">Olá!</h1>
            <span class="block text-surface-700 dark:text-surface-100 mt-2">
              Preencha seus dados...
            </span>
          </div>
        </div>
        <div class="flex flex-col gap-4 mt-12">
          <InputGroup>
            <InputGroupAddon>
              <i class="pi pi-user" />
            </InputGroupAddon>
            <InputText v-model="authStore.username" type="text" placeholder="Usuário" />
          </InputGroup>
          <InputGroup>
            <InputGroupAddon>
              <i class="pi pi-key" />
            </InputGroupAddon>
            <InputText v-model="password" type="password" placeholder="Senha" />
          </InputGroup>
          <div>
            <Button class="w-full" label="LOGIN" @click="login" />
          </div>
          <div>
            <Button class="w-full text-primary-500" text label="Esqueci minha senha..." />
          </div>
        </div>
      </div>
    </div>
    <div
      :style="{ backgroundImage: 'url(/demo/images/pages/accessDenied-bg.jpg)' }"
      class="hidden lg:flex flex-1 items-center justify-center bg-cover"
    >
      <img src="/layout/images/logo/vector_logo.png" alt="" />
    </div>
  </div>
  <AppConfig simple />
</template>

<script>
import AppConfig from '@/layout/AppConfig.vue';
import { inject } from 'vue';

export default {
  components: {
    AppConfig,
  },
  data() {
    return {
      authStore: inject('authStore'),
      password: '',
    };
  },
  methods: {
    login() {
      this.authStore.login(this.password);
    },
  },
};
</script>
