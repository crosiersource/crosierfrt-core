<script setup>
import AppConfig from '@/layout/AppConfig.vue';
import { ref } from 'vue';

const value1 = ref(null);
const value2 = ref(null);
const value3 = ref(null);
const value4 = ref(null);

const backgroundImage = ref('url(/demo/images/pages/accessDenied-bg.jpg)');
const backgroundStyle = ref({
  background: backgroundImage.value
});

function focus(event) {
  const regexNum = /^\d+$/;
  const isValid = regexNum.test(event.key);
  const nextElementInputRef = event.currentTarget.nextElementSibling.children[0];

  isValid && nextElementInputRef.focus();
}
</script>

<template>
  <div class="h-screen flex w-full bg-surface-50 dark:bg-surface-950">
    <div class="flex flex-1 flex-col bg-surface-50 dark:bg-surface-950 items-center justify-center">
      <div class="w-11/12 sm:w-[30rem]">
        <div class="flex flex-col">
          <div
            style="height: 56px; width: 56px"
            class="bg-primary-50 rounded-full flex items-center justify-center">
            <i class="pi pi-check-circle text-primary !text-4xl" />
          </div>
          <div class="mt-6">
            <h1 class="m-0 text-primary font-semibold text-4xl">Authentication?</h1>
            <span class="block text-surface-700 dark:text-surface-100 mt-2">Verify your code</span>
          </div>
        </div>
        <Fluid class="flex gap-4 items-center mt-12">
          <InputNumber
            v-model="value1"
            input-id="val1"
            input-class="text-center"
            :max="9"
            @keyup="focus($event)" />
          <InputNumber
            v-model="value2"
            input-id="val2"
            input-class="text-center"
            :max="9"
            @keyup="focus($event)" />
          <InputNumber
            v-model="value3"
            input-id="val3"
            input-class="text-center"
            :max="9"
            @keyup="focus($event)" />
          <InputNumber v-model="value4" input-id="val4" input-class="text-center" :max="9" />
        </Fluid>
        <div class="mt-4">
          <Button class="w-full" label="VERIFY NOW" />
        </div>
        <div class="mt-4">
          <Button class="w-full text-primary-500" text label="SEND AGAIN" />
        </div>
      </div>
    </div>
    <div
      :style="backgroundStyle"
      class="hidden lg:flex flex-1 items-center justify-center bg-cover">
      <img src="/layout/images/logo/vector_logo.png" alt="" />
    </div>
  </div>

  <AppConfig simple />
</template>
