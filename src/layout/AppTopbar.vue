<script setup>
import { useLayout } from '@/layout/composables/layout';
import { ref } from 'vue';

const { onMenuToggle, openRightSidebar, onTopbarMenuToggle } = useLayout();
const searchInput = ref(null);

const item = ref([
  {
    label: 'UI KIT',
    items: [
      [
        {
          label: 'UI KIT 1',
          items: [
            { label: 'Form Layout', icon: 'pi pi-fw pi-id-card', to: '/uikit/formlayout' },
            { label: 'Input', icon: 'pi pi-fw pi-check-square', to: '/uikit/input' },
            { label: 'Float Label', icon: 'pi pi-fw pi-bookmark', to: '/uikit/floatlabel' },
            { label: 'Button', icon: 'pi pi-fw pi-mobile', to: '/uikit/button' },
            { label: 'File', icon: 'pi pi-fw pi-file', to: '/uikit/file' }
          ]
        }
      ],
      [
        {
          label: 'UI KIT 2',
          items: [
            { label: 'Table', icon: 'pi pi-fw pi-table', to: '/uikit/table' },
            { label: 'List', icon: 'pi pi-fw pi-list', to: '/uikit/list' },
            { label: 'Tree', icon: 'pi pi-fw pi-share-alt', to: '/uikit/tree' },
            { label: 'Panel', icon: 'pi pi-fw pi-tablet', to: '/uikit/panel' },
            { label: 'Chart', icon: 'pi pi-fw pi-chart-bar', to: '/uikit/charts' }
          ]
        }
      ],
      [
        {
          label: 'UI KIT 3',
          items: [
            { label: 'Overlay', icon: 'pi pi-fw pi-clone', to: '/uikit/overlay' },
            { label: 'Media', icon: 'pi pi-fw pi-image', to: '/uikit/media' },
            { label: 'Menu', icon: 'pi pi-fw pi-bars', to: '/uikit/menu' },
            { label: 'Message', icon: 'pi pi-fw pi-comment', to: '/uikit/message' },
            { label: 'Misc', icon: 'pi pi-fw pi-circle-off', to: '/uikit/misc' }
          ]
        }
      ]
    ]
  },
  {
    label: 'UTILITIES',
    items: [
      [
        {
          label: 'UTILITIES 1',
          items: [
            {
              label: 'Buy Now',
              icon: 'pi pi-fw pi-shopping-cart',
              url: 'https://www.primefaces.org/store',
              target: '_blank'
            },
            {
              label: 'Documentation',
              icon: 'pi pi-fw pi-info-circle',
              to: '/documentation'
            }
          ]
        }
      ]
    ]
  }
]);

function focusSearchInput() {
  setTimeout(() => {
    searchInput.value.$el.focus();
  }, 0);
}
</script>

<template>
  <div class="layout-topbar">
    <div class="layout-topbar-start">
      <RouterLink class="layout-topbar-logo" to="/">
        <Image
          src="https://www.crosier.com.br/imgs/CROSIER_branco_transp.png"
          alt="Image"
          width="180"
          class="layout-topbar-logo-full" />
        <Image
          src="https://www.crosier.com.br/imgs/CROSIER_branco_transp.png"
          alt="Image"
          width="70"
          class="layout-topbar-logo-slim" />
      </RouterLink>
      <a ref="menuButton" class="layout-menu-button" @click="onMenuToggle">
        <i class="pi pi-chevron-right" />
      </a>

      <a ref="mobileMenuButton" class="layout-topbar-mobile-button" @click="onTopbarMenuToggle">
        <i class="pi pi-ellipsis-v" />
      </a>
    </div>

    <div class="layout-topbar-end">
      <div class="layout-topbar-actions-start">
        <MegaMenu :model="item" class="layout-megamenu" breakpoint="0px" />
      </div>
      <div class="layout-topbar-actions-end">
        <ul class="layout-topbar-items">
          <li class="layout-topbar-search">
            <a
              v-styleclass="{
                selector: '@next',
                enterFromClass: '!hidden',
                enterActiveClass: 'animate-scalein',
                leaveToClass: '!hidden',
                leaveActiveClass: 'animate-fadeout',
                hideOnOutsideClick: true
              }"
              @click="focusSearchInput()">
              <i class="pi pi-search" />
            </a>

            <div class="layout-search-panel !hidden">
              <i class="pi pi-search" />
              <InputText ref="searchInput" placeholder="Search" variant="filled" />
              <Button
                v-styleclass="{
                  selector: '.layout-search-panel',
                  leaveToClass: '!hidden',
                  leaveActiveClass: 'animate-fadeout'
                }"
                type="button"
                icon="pi pi-times"
                rounded
                text
                plain />
            </div>
          </li>
          <li>
            <a
              v-styleclass="{
                selector: '@next',
                enterFromClass: 'hidden',
                enterActiveClass: 'animate-scalein',
                leaveToClass: 'hidden',
                leaveActiveClass: 'animate-fadeout',
                hideOnOutsideClick: true
              }"
              class="">
              <OverlayBadge severity="warn" :pt="{ pcBadge: { root: '!outline-0' } }">
                <i class="pi pi-bell" />
              </OverlayBadge>
            </a>
            <div class="hidden">
              <ul class="list-none p-0 m-0">
                <li class="px-4 py-1">
                  <span>
                    You have
                    <b>4</b>
                    new notifications
                  </span>
                </li>
                <li class="p-4">
                  <div class="flex items-center">
                    <img src="/layout/images/avatar/avatar-1.png" />
                    <div class="flex flex-col ml-4 flex-1">
                      <div class="flex items-center justify-between mb-1">
                        <span class="font-bold">Jerome Bell</span>
                        <small>42 mins ago</small>
                      </div>
                      <span class="text-sm leading-normal">
                        How to write content about your photographs?
                      </span>
                    </div>
                  </div>
                </li>
                <li class="p-4">
                  <div class="flex items-center">
                    <img src="/layout/images/avatar/avatar-2.png" />
                    <div class="flex flex-col ml-4 flex-1">
                      <div class="flex items-center justify-between mb-1">
                        <span class="fs-small font-bold">Cameron Williamson</span>
                        <small>48 mins ago</small>
                      </div>
                      <span class="text-sm leading-normal">
                        Start a blog to reach your creative peak.
                      </span>
                    </div>
                  </div>
                </li>
                <li class="p-4">
                  <div class="flex items-center">
                    <img src="/layout/images/avatar/avatar-3.png" />
                    <div class="flex flex-col ml-4 flex-1">
                      <div class="flex items-center justify-between mb-1">
                        <span class="fs-small font-bold">Anna Miles</span>
                        <small>1 day ago</small>
                      </div>
                      <span class="text-sm leading-normal">Caring is the new marketing</span>
                    </div>
                  </div>
                </li>
                <li class="p-4">
                  <div class="flex items-center">
                    <img src="/layout/images/avatar/avatar-4.png" />
                    <div class="flex flex-col ml-4 flex-1">
                      <div class="flex items-center justify-between mb-1">
                        <span class="fs-small font-bold">Arlene Mccoy</span>
                        <small>4 day ago</small>
                      </div>
                      <span class="text-sm leading-normal">
                        Starting your traveling blog with Vasco.
                      </span>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </li>
          <li>
            <a
              v-styleclass="{
                selector: '@next',
                enterFromClass: 'hidden',
                enterActiveClass: 'animate-scalein',
                leaveToClass: 'hidden',
                leaveActiveClass: 'animate-fadeout',
                hideOnOutsideClick: true
              }"
              class="">
              <i class="pi pi-table" />
            </a>
            <div class="hidden">
              <div class="flex flex-wrap">
                <div class="w-4/12 flex flex-col items-center p-4">
                  <Button class="mb-2" rounded icon="pi pi-image" />
                  <span>Products</span>
                </div>
                <div class="w-4/12 flex flex-col items-center p-4">
                  <Button class="mb-2" severity="success" rounded icon="pi pi-file-pdf" />
                  <span>Reports</span>
                </div>
                <div class="w-4/12 flex flex-col items-center p-4">
                  <Button class="mb-2" severity="secondary" rounded icon="pi pi-dollar" />
                  <span>Balance</span>
                </div>
                <div class="w-4/12 flex flex-col items-center p-4">
                  <Button class="mb-2" severity="warn" rounded icon="pi pi-cog" />
                  <span>Settings</span>
                </div>
                <div class="w-4/12 flex flex-col items-center p-4">
                  <Button class="mb-2" severity="help" rounded icon="pi pi-key" />
                  <span>Credentials</span>
                </div>
                <div class="w-4/12 flex flex-col items-center p-4">
                  <Button class="mb-2" severity="info" rounded icon="pi pi-sitemap" />
                  <span>Sitemap</span>
                </div>
              </div>
            </div>
          </li>
          <li>
            <a
              v-styleclass="{
                selector: '@next',
                enterFromClass: 'hidden',
                enterActiveClass: 'animate-scalein',
                leaveToClass: 'hidden',
                leaveActiveClass: 'animate-fadeout',
                hideOnOutsideClick: true
              }"
              class="">
              <img src="/layout/images/avatar/amyelsner.png" alt="avatar" class="w-8 h-8" />
            </a>
            <div class="hidden">
              <ul class="list-none p-0 m-0">
                <li>
                  <a
                    class="cursor-pointer flex items-center hover:bg-emphasis duration-150 transition-all px-4 py-2">
                    <i class="pi pi-cog mr-2" />
                    <span>Settings</span>
                  </a>
                </li>
                <li>
                  <a
                    class="cursor-pointer flex items-center hover:bg-emphasis duration-150 transition-all px-4 py-2">
                    <i class="pi pi-file-o mr-2" />
                    <span>Terms of Usage</span>
                  </a>
                </li>
                <li>
                  <a
                    class="cursor-pointer flex items-center hover:bg-emphasis duration-150 transition-all px-4 py-2">
                    <i class="pi pi-compass mr-2" />
                    <span>Support</span>
                  </a>
                </li>
                <li>
                  <a
                    class="cursor-pointer flex items-center hover:bg-emphasis duration-150 transition-all px-4 py-2">
                    <i class="pi pi-power-off mr-2" />
                    <span>Logout</span>
                  </a>
                </li>
              </ul>
            </div>
          </li>
          <li>
            <a class="" @click="openRightSidebar">
              <i class="pi pi-arrow-left" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
