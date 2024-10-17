<script setup>
import { useLayout } from '@/layout/composables/layout';
import { computed, onBeforeUnmount, onMounted } from 'vue';
import AppBreadCrumb from './AppBreadcrumb.vue';
import AppConfig from './AppConfig.vue';
import AppFooter from './AppFooter.vue';
import AppRightMenu from './AppRightMenu.vue';
import AppSidebar from './AppSidebar.vue';
import AppTopbar from './AppTopbar.vue';

const { layoutConfig, layoutState, watchSidebarActive, unbindOutsideClickListener } = useLayout();

onMounted(() => {
    watchSidebarActive();
});

onBeforeUnmount(() => {
    unbindOutsideClickListener();
});

const containerClass = computed(() => {
    let styleClass = {
        'layout-overlay': layoutConfig.menuMode === 'overlay',
        'layout-static': layoutConfig.menuMode === 'static',
        'layout-slim': layoutConfig.menuMode === 'slim',
        'layout-slim-plus': layoutConfig.menuMode === 'slim-plus',
        'layout-horizontal': layoutConfig.menuMode === 'horizontal',
        'layout-reveal': layoutConfig.menuMode === 'reveal',
        'layout-drawer': layoutConfig.menuMode === 'drawer',
        'layout-sidebar-dark': layoutConfig.colorScheme === 'dark',
        'layout-static-inactive': layoutState.staticMenuDesktopInactive && layoutConfig.menuMode === 'static',
        'layout-overlay-active': layoutState.overlayMenuActive,
        'layout-mobile-active': layoutState.staticMenuMobileActive,
        'layout-topbar-menu-active': layoutState.topbarMenuActive,
        'layout-menu-profile-active': layoutState.rightMenuActive,
        'layout-sidebar-active': layoutState.sidebarActive,
        'layout-sidebar-anchored': layoutState.anchored
    };

    styleClass['layout-topbar-' + layoutConfig.topbarTheme] = true;
    styleClass['layout-menu-' + layoutConfig.menuTheme] = true;
    styleClass['layout-menu-profile-' + layoutConfig.menuProfilePosition] = true;

    return styleClass;
});
</script>

<template>
    <div :class="['layout-container', { ...containerClass }]">
        <AppTopbar />
        <AppRightMenu />
        <AppSidebar />

        <div class="layout-content-wrapper">
            <AppBreadCrumb></AppBreadCrumb>
            <div class="layout-content">
                <router-view></router-view>
            </div>
            <AppFooter></AppFooter>
        </div>

        <AppConfig />

        <Toast></Toast>
        <div class="layout-mask"></div>
    </div>
</template>
