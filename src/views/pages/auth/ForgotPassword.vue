<script setup>
import AppConfig from '@/layout/AppConfig.vue';
import { ref } from 'vue';

const backgroundImage = ref('url(/demo/images/pages/accessDenied-bg.jpg)');
const backgroundStyle = ref({
  background: backgroundImage.value,
});
</script>

<template>
  <div class="h-screen flex w-full bg-surface-50 dark:bg-surface-950">
    <div class="flex flex-1 flex-col bg-surface-50 dark:bg-surface-950 items-center justify-center">
      <div class="w-11/12 sm:w-[30rem]">
        <div class="flex flex-col">
          <div
            style="height: 56px; width: 56px"
            class="bg-primary-50 rounded-full flex items-center justify-center"
          >
            <i class="pi pi-question text-primary !text-4xl" />
          </div>
          <div class="mt-6">
            <h1 class="m-0 text-primary font-semibold text-4xl">Forgot password?</h1>
            <span class="block text-surface-700 dark:text-surface-100 mt-2">
              Please enter your email address
            </span>
          </div>
        </div>
        <div class="flex flex-col gap-4 mt-12">
          <InputGroup>
            <InputGroupAddon>
              <i class="pi pi-at" />
            </InputGroupAddon>
            <InputText placeholder="Email" />
          </InputGroup>
          <InputGroup>
            <Button class="w-full" label="SUBMIT EMAIL" />
          </InputGroup>
          <InputGroup>
            <Button class="w-full text-primary-500" text label="BACK TO LOGIN" />
          </InputGroup>
        </div>
      </div>
    </div>
    <div
      :style="backgroundStyle"
      class="hidden lg:flex flex-1 items-center justify-center bg-cover"
    >
      <img src="/layout/images/logo/vector_logo.png" alt="" />
    </div>
  </div>
  <AppConfig simple />
</template>
