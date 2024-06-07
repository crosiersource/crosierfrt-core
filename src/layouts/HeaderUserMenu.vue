<template>
  <div class="text-center">
    <v-menu open-on-hover>
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props" prepend-icon="fas fa-user">
          {{ authStore.username }}
        </v-btn>
      </template>

      <v-list>
        <v-list-item v-for="(item, index) in items" :key="index">
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>
<script>
import { mapStores } from "pinia";
import { useAuthStore } from "@/stores/auth.store";

export default {
  name: "HeaderUserMenu",

  data: () => ({
    items: [
      { title: "Click Me" },
      { title: "Click Me" },
      { title: "Click Me" },
      { title: "Click Me 2" },
    ],
  }),

  computed: {
    ...mapStores(useAuthStore),
  },
};
</script>
