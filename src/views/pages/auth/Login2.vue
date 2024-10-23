<script setup>
import AppConfig from '@/layout/AppConfig.vue';
import { ref } from 'vue';

const backgroundImage = ref('url(/demo/images/pages/login-bg.jpg)');
const backgroundStyle = ref({
  background: backgroundImage.value,
});
</script>

<template>
  <div class="h-screen flex flex-col !bg-cover" :style="backgroundStyle">
    <div class="shadow bg-indigo-500 z-50 p-4 flex justify-between flex-row items-center">
      <div class="ml-4 flex" @click="$router.push('/')">
        <div>
          <img class="h-8" src="/layout/images/logo/logo2x.png" alt="" />
        </div>
      </div>
      <div class="mr-4 flex">
        <Button class="!text-white" text plain @click="$router.push('/')">DASHBOARD</Button>
      </div>
    </div>

    <div class="self-center mt-auto mb-auto">
      <div
        class="text-center z-50 flex flex-col border rounded-md border-surface bg-surface-0 dark:bg-surface-900 px-4"
      >
        <div class="-mt-8 primary-contrast bg-cyan-700 rounded-md mx-auto px-4 py-1">
          <span class="text-4xl m-0">LOGIN</span>
        </div>

        <span class="text-2xl font-semibold my-4">Welcome</span>

        <div class="text-muted-color mb-12 px-12">
          Please use the form to sign-in Ultima network
        </div>

        <div class="w-full flex flex-col gap-4 px-4 pb-12">
          <IconField>
            <InputIcon class="pi pi-envelope" />
            <InputText class="w-full" placeholder="E-mail" />
          </IconField>

          <IconField>
            <InputIcon class="pi pi-key" />
            <InputText type="password" class="w-full" placeholder="Password" />
          </IconField>
          <Button class="w-full my-4 px-4" label="LOGIN" @click="$router.push('/')" />
        </div>
      </div>
    </div>
  </div>
  <AppConfig simple />
</template>
