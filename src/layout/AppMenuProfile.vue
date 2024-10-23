<script setup>
import { useLayout } from '@/layout/composables/layout';
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const { layoutState, layoutConfig, onMenuProfileToggle, isHorizontal, isSlim } = useLayout();

const menuClass = computed(() => (isHorizontal.value ? 'overlay' : null));

function toggleMenu() {
  const menu = document.querySelector('.menu-transition');

  if (layoutState.menuProfileActive) {
    menu.style.maxHeight = '0';
    menu.style.opacity = '0';
    if (isHorizontal.value) {
      menu.style.transform = 'scaleY(0.8)';
    }
  } else {
    menu.style.maxHeight = menu.scrollHeight + 'px';
    menu.style.opacity = '1';
    if (isHorizontal.value) {
      menu.style.transform = 'scaleY(1)';
    }
  }

  onMenuProfileToggle();
}

const iconClass = computed(() => {
  const profilePositionStart = layoutConfig.menuProfilePosition === 'start';

  return {
    'pi-angle-up':
      (layoutState.menuProfileActive && (profilePositionStart || isHorizontal.value)) ||
      (!layoutState.menuProfileActive && !profilePositionStart && !isHorizontal.value),
    'pi-angle-down':
      (!layoutState.menuProfileActive && profilePositionStart) ||
      (layoutState.menuProfileActive && !profilePositionStart) ||
      isHorizontal.value,
  };
});

function tooltipValue(tooltipText) {
  return isSlim.value ? tooltipText : null;
}
</script>

<template>
  <div class="layout-menu-profile">
    <button v-tooltip="{ value: tooltipValue('Profile') }" @click="toggleMenu">
      <img
        src="/layout/images/avatar/amyelsner.png"
        alt="avatar"
        style="width: 32px; height: 32px"
      />
      <span>
        <strong>Amy Elsner</strong>
        <small>Webmaster</small>
      </span>
      <i class="layout-menu-profile-toggler pi pi-fw" :class="iconClass" />
    </button>

    <ul :class="['menu-transition', menuClass]" style="overflow: hidden; max-height: 0; opacity: 0">
      <li v-tooltip="{ value: tooltipValue('Settings') }">
        <button @click="router.push('/documentation')">
          <i class="pi pi-cog pi-fw" />
          <span>Settings</span>
        </button>
      </li>

      <li v-tooltip="{ value: tooltipValue('Profile') }">
        <button @click="router.push('/documentation')">
          <i class="pi pi-file-o pi-fw" />
          <span>Profile</span>
        </button>
      </li>
      <li v-tooltip="{ value: tooltipValue('Support') }">
        <button @click="router.push('/documentation')">
          <i class="pi pi-compass pi-fw" />
          <span>Support</span>
        </button>
      </li>
      <li v-tooltip="{ value: tooltipValue('Logout') }">
        <button @click="router.push('/auth/login2')">
          <i class="pi pi-power-off pi-fw" />
          <span>Logout</span>
        </button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.menu-transition {
  transition:
    max-height 400ms cubic-bezier(0.86, 0, 0.07, 1),
    opacity 400ms cubic-bezier(0.86, 0, 0.07, 1);
}
.menu-transition.overlay {
  transition:
    opacity 100ms linear,
    transform 120ms cubic-bezier(0, 0, 0.2, 1);
}
</style>
