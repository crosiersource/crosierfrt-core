<template>
  <div
    style="display: flex; flex-direction: column; min-height: 100vh"
    :class="['layout-container', { ...containerClass }]"
  >
    <ProgressSpinner v-if="loadingStore.isLoading" class="progress-spinner" />
    <BlockUI full-screen :blocked="loadingStore.isLoading" />

    <AppTopbar />
    <AppRightMenu />
    <AppSidebar />

    <div class="layout-content-wrapper">
      <AppBreadCrumb v-if="false" />
      <div class="layout-content">
        <RouterView />
      </div>
      <AppFooter />
    </div>

    <AppConfig />

    <Toast />
    <div class="layout-mask" />
  </div>
</template>

<script>
import { computed, onBeforeUnmount, onMounted, inject } from 'vue';
import { useLayout } from '@/layout/composables/layout';
import AppBreadCrumb from './AppBreadcrumb.vue';
import AppConfig from './AppConfig.vue';
import AppFooter from './AppFooter.vue';
import AppRightMenu from './AppRightMenu.vue';
import AppSidebar from './AppSidebar.vue';
import AppTopbar from './AppTopbar.vue';

export default {
  name: 'App',
  components: {
    AppTopbar,
    AppRightMenu,
    AppSidebar,
    AppBreadCrumb,
    AppFooter,
    AppConfig,
  },
  setup() {
    const { layoutConfig, layoutState, watchSidebarActive, unbindOutsideClickListener } =
      useLayout();

    onMounted(() => {
      watchSidebarActive();
    });

    onBeforeUnmount(() => {
      unbindOutsideClickListener();
    });

    return {
      layoutConfig,
      layoutState,
      containerClass: computed(() => {
        const styleClass = {
          'layout-overlay': layoutConfig.menuMode === 'overlay',
          'layout-static': layoutConfig.menuMode === 'static',
          'layout-slim': layoutConfig.menuMode === 'slim',
          'layout-slim-plus': layoutConfig.menuMode === 'slim-plus',
          'layout-horizontal': layoutConfig.menuMode === 'horizontal',
          'layout-reveal': layoutConfig.menuMode === 'reveal',
          'layout-drawer': layoutConfig.menuMode === 'drawer',
          'layout-sidebar-dark': layoutConfig.colorScheme === 'dark',
          'layout-static-inactive':
            layoutState.staticMenuDesktopInactive && layoutConfig.menuMode === 'static',
          'layout-overlay-active': layoutState.overlayMenuActive,
          'layout-mobile-active': layoutState.staticMenuMobileActive,
          'layout-topbar-menu-active': layoutState.topbarMenuActive,
          'layout-menu-profile-active': layoutState.rightMenuActive,
          'layout-sidebar-active': layoutState.sidebarActive,
          'layout-sidebar-anchored': layoutState.anchored,
        };

        styleClass['layout-topbar-' + layoutConfig.topbarTheme] = true;
        styleClass['layout-menu-' + layoutConfig.menuTheme] = true;
        styleClass['layout-menu-profile-' + layoutConfig.menuProfilePosition] = true;

        return styleClass;
      }),
    };
  },
  data() {
    return {
      loadingStore: inject('loadingStore'),
    };
  },
};
</script>

<style>
.progress-spinner {
  position: absolute; /* Posiciona o spinner em relação ao BlockUI */
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); /* Centraliza o spinner */
  z-index: 1001; /* Garante que o spinner apareça acima do BlockUI */
}
</style>
