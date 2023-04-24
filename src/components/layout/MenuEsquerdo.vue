<template>
  <div v-if='menu.length > 0'>
    <sidebar-menu
      :key='menuKey'
      v-model:collapsed='this.layoutStore.menuCollapsed'
      :menu='menu'
      :theme='selectedTheme'
      :show-one-child='true'
      @update:collapsed='onToggleCollapse'
      @item-click='onItemClick'
    />
  </div>
</template>

<script>
import { h, markRaw } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { mapStores } from 'pinia'
import { useLayoutStore } from '@/stores/layout'
import MenuEsquerdoHeader from '@/components/layout/MenuEsquerdoHeader.vue'

const separator = {
  template: '<hr style="border-color: rgba(0, 0, 0, 0.1); margin: 20px;">'
}

const faIcon = (props) => {
  return {
    element: markRaw({
      render: () => h('div', [h(FontAwesomeIcon, { size: 'lg', ...props })])
    })
  }
}

export default {
  name: 'MenuEsquerdo',

  data() {
    return {
      menu: [],
      menuKey: 0,
      themes: [
        {
          name: 'Default theme',
          input: ''
        },
        {
          name: 'White theme',
          input: 'white-theme'
        }
      ],
      selectedTheme: 'white-theme',
    }
  },

  setup() {
    const layoutStore = useLayoutStore()
    return { layoutStore }
  },

  computed: {

    getLogo() {
      console.log('Vou buscar o logo')
      const img = this.collapsed
        ? import.meta.env.VITE_CROSIER_LOGO_PEQ
        : import.meta.env.VITE_CROSIER_LOGO
      console.log(img)
      const classCollapsed = this.collapsed ? 'collapsed' : ''
      const classOnMobile = this.isOnMobile ? 'onmobile' : ''

      return {
        template: `<img id='logo' class='${classCollapsed} ${classOnMobile}' src='${img}' alt='logo' />`
      }
    }
  },

  mounted() {
    this.onResize()
    this.buildMenu()
    window.addEventListener('resize', this.onResize)
  },

  methods: {

    onToggleCollapse(collapsed) {
      console.log('onToggleCollapse')
      console.log(collapsed)
      this.layoutStore.setMenuCollapsed(collapsed)

      const logoElem = document.getElementById('logo')
      if (collapsed) {
        logoElem.src = import.meta.env.VITE_CROSIER_LOGO_PEQ
        logoElem.classList.add('collapsed')
      } else {
        logoElem.src = import.meta.env.VITE_CROSIER_LOGO
        logoElem.classList.remove('collapsed')
      }
    },

    onItemClick(event, item) {
      console.log('onItemClick')
      console.log(event)
      console.log(item)
    },

    onResize() {
      if (window.innerWidth <= 767) {
        this.layoutStore.setOnMobile(true)
        this.layoutStore.setMenuCollapsed(true)
      } else {
        this.layoutStore.setOnMobile(false)
        this.layoutStore.setMenuCollapsed(false)
      }
    },

    async buildMenu() {
      console.log('vou chamar o buildMenuByUrl')
      const menu = await this.layoutStore.buildMenuByUrl()
      console.log('retornou:')
      console.log(menu)
      if (!menu) {
        return
      }
      this.menu.push({
        component: MenuEsquerdoHeader
      })


      // iterate over menu and add icons
      menu.forEach((item) => {
        item.url = item.url.replace(import.meta.env.VITE_CORE_URL, '')
        const menuItem = {
          title: item.label,
          icon: faIcon({ icon: item.icon })
        }
        if (item.filhos) {
          menuItem.child = []
          item.filhos.forEach((subItem) => {
            // remove import.meta.env.VITE_CORE_URL from url
            subItem.url = subItem.url.replace(import.meta.env.VITE_CORE_URL, '')
            menuItem.child.push({
              href: subItem.url,
              title: subItem.label,
              icon: faIcon({ icon: subItem.icon, size: 'sm' })
            })
          })
        } else {
          menuItem.href = item.url
        }

        this.menu.push(menuItem)
        console.log('mais um')
        console.log(this.menu)
      })

      this.menu.push({
        component: markRaw(separator)
      })

      this.menuKey++
    }
  }
}
</script>

<style lang='scss'>
#logo {
  display: block;
  margin: 0 auto;
  height: 36px;
}

#logo.collapsed {
  width: 36px;
}

.sidebar-overlay {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: #000;
  opacity: 0.5;
  z-index: 900;
}
</style>
