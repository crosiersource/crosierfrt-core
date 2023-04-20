<template>
  <Layout>
    <template #content>
      <h1>Estou na Home</h1>
    </template>
  </Layout>
</template>

<script>
import Layout from "@/components/layout/Layout.vue";
export default {
  name: "Home",

  components: {
    Layout,
  },
};
</script>
<script setup>
</script>