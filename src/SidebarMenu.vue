<template>
  <sidebar-menu
    v-model:collapsed="collapsed"
    :menu="menu"
    :theme="selectedTheme"
    :show-one-child="true"
    @update:collapsed="onToggleCollapse"
    @item-click="onItemClick"
  />  
</template>

<script>
import { h, markRaw } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const separator = {
  template: '<hr style="border-color: rgba(0, 0, 0, 0.1); margin: 20px;">'
}

const faIcon = (props) => {
  return {
    element: markRaw({
      render: () => h('div', [
        h(FontAwesomeIcon, { size: 'lg', ...props })
      ])
    })
  }
}

export default {
  name: 'App',
  data () {
    return {
      menu: [
        {
          header: 'Menu Principal',
          hiddenOnCollapse: true
        },
        {
          href: '/',
          title: 'Installation',
          icon: faIcon({ icon: 'fa-solid fa-download' })
        },
        {
          href: '/basic-usage',
          title: 'Basic Usage',
          icon: faIcon({ icon: 'fa-solid fa-code' })
        },
        {
          header: 'Usage',
          hiddenOnCollapse: true
        },
        {
          href: '/props',
          title: 'Props',
          icon: faIcon({ icon: 'fa-solid fa-cogs' })
        },
        {
          href: '/events',
          title: 'Events',
          icon: faIcon({ icon: 'fa-solid fa-bell' })
        },
        {
          href: '/styling',
          title: 'Styling',
          icon: faIcon({ icon: 'fa-solid fa-palette' })
        },
        {
          component: markRaw(separator)
        },
        {
          header: 'Example',
          hiddenOnCollapse: true
        },
        {
          href: '/disabled',
          title: 'Disabled page',
          icon: faIcon({ icon: 'fa-solid fa-lock' }),
          disabled: true
        },
        {
          title: 'Badge',
          icon: faIcon({ icon: 'fa-solid fa-cog' }),
          badge: {
            text: 'new',
            class: 'vsm--badge_default'
          }
        },
        {
          href: '/page',
          title: 'Dropdown Page',
          icon: faIcon({ icon: 'fa-solid fa-list-ul' }),
          child: [
            {
              href: '/page/sub-page-1',
              title: 'Sub Page 01',
              icon: faIcon({ icon: 'fa-solid fa-file-alt', size: 'sm' })
            },
            {
              href: '/page/sub-page-2',
              title: 'Sub Page 02',
              icon: faIcon({ icon: 'fa-solid fa-file-alt', size: 'sm' })
            }
          ]
        },
        {
          title: 'Multiple Level',
          icon: faIcon({ icon: 'fa-solid fa-list-alt' }),
          child: [
            {
              title: 'page'
            },
            {
              title: 'Level 2 ',
              child: [
                {
                  title: 'page'
                },
                {
                  title: 'Page'
                }
              ]
            },
            {
              title: 'Page'
            },
            {
              title: 'Another Level 2',
              child: [
                {
                  title: 'Level 3',
                  child: [
                    {
                      title: 'Page'
                    },
                    {
                      title: 'Page'
                    }
                  ]
                }
              ]
            }
          ]
        }
      ],
      collapsed: false,
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
      isOnMobile: false
    }
  },
  mounted () {
    this.onResize()
    window.addEventListener('resize', this.onResize)
  },
  methods: {
    onToggleCollapse (collapsed) {
      console.log('onToggleCollapse')
      console.log(collapsed)
    },
    onItemClick (event, item) {
      console.log('onItemClick')
      console.log(event)
      console.log(item)
    },
    onResize () {
      if (window.innerWidth <= 767) {
        this.isOnMobile = true
        this.collapsed = true
      } else {
        this.isOnMobile = false
        this.collapsed = false
      }
    }
  }
}
</script>

<style lang="scss">
body,
html {
  margin: 0;
  padding: 0;
}

body {
  background-color: #f2f4f7;
  color: #262626;
}

#app {
  padding-left: 290px;
  transition: 0.3s ease;
}
#app.collapsed {
  padding-left: 65px;
}
#app.onmobile {
  padding-left: 65px;
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
