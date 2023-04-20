<template>
  <MenuEsquerdo />

  <div
    v-if="isOnMobile && !isMenuCollapsed"
    class="sidebar-overlay"
    @click="setMenuCollapsed(true)"
  />

  <div id="layout" :class="[{ collapsed: isMenuCollapsed }, { onmobile: isOnMobile }]">
    <LayoutHeader />

    <slot name="content"></slot>

    <LayoutFooter />
  </div>
</template>

<script>
import LayoutHeader from "./Header.vue";
import LayoutFooter from "./Footer.vue";
import MenuEsquerdo from "./MenuEsquerdo.vue";

export default {
  name: "Layout",

  components: {
    LayoutHeader,
    LayoutFooter,
    MenuEsquerdo,
  },

};
</script>

<style scoped>
body,
html {
  margin: 0;
  padding: 0;
}

#layout {
  padding-top: 60px;
  padding-left: 290px;
  transition: 0.3s ease;
}

#layout.collapsed {
  padding-left: 65px;
}

#layout.onmobile {
  padding-left: 65px;
}
</style>
