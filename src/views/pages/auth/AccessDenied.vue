<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const backgroundImage = ref('url(/demo/images/pages/accessDenied-bg.jpg)');
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
      <div
        class="ml-4 flex"
        @click="navigateToDashboard"
      >
        <div>
          <img
            class="h-8"
            src="/layout/images/logo/logo2x.png"
            alt="DASHBOARD"
          >
        </div>
      </div>
      <div class="mr-4 flex">
        <Button
          type="button"
          label="DASHBOARD"
          class="!text-white"
          text
          @click="navigateToDashboard"
        />
      </div>
    </div>
    <div class="self-center mt-auto mb-auto">
      <div
        class="text-center z-40 rounded-lg border border-surface bg-white p-4 shadow-md flex flex-col"
      >
        <div class="rounded-md mx-auto border border-surface bg-orange-500 -mt-12 px-4 py-1">
          <span class="m-0 text-3xl font-semibold text-surface-0 dark:text-surface-900">
            ACCESS DENIED
          </span>
        </div>
        <div class="bg-surface-200 dark:bg-surface-600 p-4 mb-8 shadow rounded-md mt-4 px-12">
          <img
            src="/demo/images/pages/accessDenied.png"
            alt=""
          >
        </div>
        <div class="text-muted-color pb-12">Requested resource is not available.</div>
        <Button
          type="button"
          label="GO BACK TO DASHBOARD"
          text
          @click="navigateToDashboard"
        />
      </div>
    </div>
  </div>
</template>
