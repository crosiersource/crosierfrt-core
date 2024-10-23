<script setup>
import AppConfig from '@/layout/AppConfig.vue';
import { ref } from 'vue';

const value1 = ref(null);
const value2 = ref(null);

const backgroundImage = ref('url(/demo/images/pages/accessDenied-bg.jpg)');
const backgroundStyle = ref({
  background: backgroundImage.value
});
</script>

<template>
  <div class="h-screen flex w-full bg-surface-50 dark:bg-surface-950">
    <div class="flex flex-1 flex-col bg-surface-50 dark:bg-surface-950 items-center justify-center">
      <div class="w-11/12 sm:w-[30rem]">
        <div class="flex flex-col">
          <div style="height: 56px; width: 56px" class="bg-primary-50 rounded-full flex items-center justify-center">
            <i class="pi pi-users text-primary !text-4xl" />
          </div>
          <div class="mt-6">
            <h1 class="m-0 text-primary font-semibold text-4xl">Join us!</h1>
            <span class="block text-surface-700 dark:text-surface-100 mt-2">Please fill the fields to sign-up Ultima network</span>
          </div>
        </div>
        <div class="flex flex-col gap-4 mt-12">
          <InputGroup>
            <InputGroupAddon>
              <i class="pi pi-user" />
            </InputGroupAddon>
            <InputText placeholder="Name" />
          </InputGroup>
          <InputGroup>
            <InputGroupAddon>
              <i class="pi pi-at" />
            </InputGroupAddon>
            <InputText placeholder="Email" />
          </InputGroup>
          <InputGroup>
            <InputGroupAddon>
              <i class="pi pi-key" />
            </InputGroupAddon>
            <Password id="password" v-model="value1" placeholder="Password" input-class="w-full" toggle-mask />
          </InputGroup>
          <InputGroup>
            <InputGroupAddon>
              <i class="pi pi-key" />
            </InputGroupAddon>
            <Password id="password" v-model="value2" placeholder="Password Again" input-class="w-full" toggle-mask />
          </InputGroup>
          <div>
            <Button class="w-full" label="SIGN UP" />
          </div>
          <div>
            <Button class="w-full text-primary-500" text label="BACK TO LOGIN" />
          </div>
        </div>
      </div>
    </div>
    <div :style="backgroundStyle" class="hidden lg:flex flex-1 items-center justify-center bg-cover">
      <img src="/layout/images/logo/vector_logo.png" alt="" />
    </div>
  </div>
  <AppConfig simple />
</template>
