<script setup>
import AppConfig from '@/layout/AppConfig.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const backgroundImage = ref('url(/demo/images/pages/error-bg.jpg)');
const backgroundStyle = ref({
  background: backgroundImage.value
});

function navigateToDashboard() {
  router.push('/');
}
</script>

<template>
  <div
    class="h-screen flex flex-col !bg-cover"
    :style="backgroundStyle"
  >
    <div class="shadow-md z-30 bg-indigo-600 p-4 flex justify-between flex-row items-center">
      <RouterLink
        class="ml-4 flex"
        to="/"
      >
        <div>
          <img
            class="h-8"
            src="/layout/images/logo/logo2x.png"
            alt=""
          >
        </div>
      </RouterLink>
      <div class="mr-4 flex">
        <Button
          label="DASHBOARD"
          class="!text-white"
          text
          @click="navigateToDashboard"
        />
      </div>
    </div>
    <div class="self-center mt-auto mb-auto">
      <div
        class="text-center z-40 rounded-lg border border-surface bg-surface-0 dark:bg-surface-900 p-4 shadow-md flex flex-col"
      >
        <div class="rounded-md mx-auto text-white bg-pink-500 -mt-12 px-4 py-1">
          <span
            class="text-4xl m-0"
            style="color: #212121"
          >ERROR</span>
        </div>
        <div class="bg-surface-200 dark:bg-surface-600 p-4 mb-8 shadow rounded-md mt-4 px-12">
          <img
            src="/demo/images/pages/error.png"
            class="w-full"
            alt=""
          >
        </div>
        <div class="text-muted-color pb-12">Requested resource is not available.</div>
        <Button
          label="GO BACK TO DASHBOARD"
          text
          @click="navigateToDashboard"
        />
      </div>
    </div>
  </div>
  <AppConfig simple />
</template>
