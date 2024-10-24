<script setup>
import { useLayout } from '@/layout/composables/layout';

const { isDarkTheme } = useLayout();
</script>

<template>
  <div class="layout-footer">
    <Image src="https://www.crosier.com.br/CROSIER_400x89.png" alt="Logo Crosier" width="70" />
    <!--    <div class="flex gap-2">-->
    <!--      <Button icon="pi pi-github" rounded text plain />-->
    <!--      <Button icon="pi pi-facebook" rounded text plain />-->
    <!--      <Button icon="pi pi-twitter" rounded text plain />-->
    <!--    </div>-->
  </div>
</template>
