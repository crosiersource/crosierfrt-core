<script setup>
import { useLayout } from '@/layout/composables/layout';

const { isDarkTheme } = useLayout();
</script>

<template>
  <div class="layout-footer">
    <img
      :src="'/layout/images/logo/footer-' + (isDarkTheme ? 'ultima-dark' : 'ultima') + '.svg'"
      alt="ultima-footer-logo"
    >
    <div class="flex gap-2">
      <Button
        icon="pi pi-github"
        rounded
        text
        plain
      />
      <Button
        icon="pi pi-facebook"
        rounded
        text
        plain
      />
      <Button
        icon="pi pi-twitter"
        rounded
        text
        plain
      />
    </div>
  </div>
</template>
