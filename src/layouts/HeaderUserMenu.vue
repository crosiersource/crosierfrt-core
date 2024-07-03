<template>
  <div class="text-center">
    <VMenu open-on-hover>
      <template #activator="{ props }">
        <VBtn
          v-bind="props"
          prepend-icon="fas fa-user"
        >
          {{ authStore.username }}
        </VBtn>
      </template>

      <VList>
        <VListItem
          v-for="(item, index) in items"
          :key="index"
        >
          <VListItemTitle>{{ item.title }}</VListItemTitle>
        </VListItem>
      </VList>
    </VMenu>
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
