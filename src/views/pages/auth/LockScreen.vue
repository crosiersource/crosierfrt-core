<script setup>
import AppConfig from '@/layout/AppConfig.vue';
import { ref } from 'vue';

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
          <div
            style="height: 56px; width: 56px"
            class="bg-primary-50 rounded-full flex items-center justify-center"
          >
            <i class="pi pi-lock text-primary !text-4xl" />
          </div>
          <div class="mt-6">
            <span class="m-0 text-primary font-semibold text-4xl">Lock Screen</span>
            <span class="block text-surface-700 dark:text-surface-100 mt-2">
              Enter your password
            </span>
          </div>
        </div>
        <div class="flex flex-col gap-4 mt-12">
          <div class="flex justify-between items-center">
            <div class="flex gap-4 items-center">
              <Avatar
                image="/demo/images/avatar/annafali.png"
                shape="circle"
                size="large"
              />
              <div class="flex flex-col gap-1">
                <span class="text-color font-semibold text-lg">Amy Elsner</span>
                <span class="text-muted-color text-sm">UX Designer</span>
              </div>
            </div>
            <Button
              class="text-primary-500"
              text
              icon="pi pi-sign-out"
              label="Log out"
            />
          </div>
          <InputGroup>
            <InputGroupAddon>
              <i class="pi pi-key" />
            </InputGroupAddon>
            <Password
              id="password"
              placeholder="Password"
              input-class="w-full"
            />
          </InputGroup>
          <InputGroup>
            <Button
              class="w-full"
              label="UNLOCK"
            />
          </InputGroup>
          <InputGroup>
            <Button
              class="w-full text-primary-500"
              text
              label="SWITCH ACCOUNT"
            />
          </InputGroup>
        </div>
      </div>
    </div>
    <div
      :style="backgroundStyle"
      class="hidden lg:flex flex-1 items-center justify-center bg-cover"
    >
      <img
        src="/layout/images/logo/vector_logo.png"
        alt=""
      >
    </div>
  </div>

  <AppConfig simple />
</template>
