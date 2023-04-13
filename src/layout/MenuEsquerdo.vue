<template>
  <div v-if="menu.length > 0">
    <sidebar-menu
      :key="menuKey"
      v-model:collapsed="collapsed"
      :menu="menu"
      :theme="selectedTheme"
      :show-one-child="true"
      @update:collapsed="onToggleCollapse"
      @item-click="onItemClick"
    />
  </div>
</template>

<script>
import { h, markRaw } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { mapActions, mapGetters, mapMutations } from "vuex";

// const separator = {
//   template: '<hr style="border-color: rgba(0, 0, 0, 0.1); margin: 20px;">',
// };

const faIcon = (props) => {
  return {
    element: markRaw({
      render: () => h("div", [h(FontAwesomeIcon, { size: "lg", ...props })]),
    }),
  };
};

export default {
  name: "InnerApp",
  data() {
    return {
      menu: [],
      menuKey: 0,
      collapsed: false,
      themes: [
        {
          name: "Default theme",
          input: "",
        },
        {
          name: "White theme",
          input: "white-theme",
        },
      ],
      selectedTheme: "white-theme",
      isOnMobile: false,
    };
  },

  computed: {
    ...mapGetters("layout", ["isLoading", "isOnMobile", "isMenuCollapsed"]),

    getLogo() {
      const img = this.collapsed
        ? import.meta.env.VITE_CROSIER_LOGO_PEQ
        : import.meta.env.VITE_CROSIER_LOGO;

      const classCollapsed = this.collapsed ? "collapsed" : "";
      const classOnMobile = this.isOnMobile ? "onmobile" : "";

      return {
        template: `<img id="logo" class="${classCollapsed} ${classOnMobile}" src="${img}" alt="logo" />`,
      };
    },
  },

  mounted() {
    this.onResize();
    this.buildMenu();
    window.addEventListener("resize", this.onResize);
  },

  methods: {
    ...mapMutations({
      setOnMobile: "layout/setOnMobile",
      setMenuCollapsed: "layout/setMenuCollapsed",
    }),
    ...mapActions({ buildMenuByUrl: "layout/buildMenuByUrl" }),

    onToggleCollapse(collapsed) {
      console.log("onToggleCollapse");
      console.log(collapsed);
      this.setMenuCollapsed(collapsed);

      const logoElem = document.getElementById("logo");
      if (collapsed) {
        logoElem.src = import.meta.env.VITE_CROSIER_LOGO_PEQ;
        logoElem.classList.add("collapsed");
      } else {
        logoElem.src = import.meta.env.VITE_CROSIER_LOGO;
        logoElem.classList.remove("collapsed");
      }
    },

    onItemClick(event, item) {
      console.log("onItemClick");
      console.log(event);
      console.log(item);
    },

    onResize() {
      if (window.innerWidth <= 767) {
        this.setOnMobile(true);
        this.setMenuCollapsed(true);
      } else {
        this.setOnMobile(false);
        this.setMenuCollapsed(false);
      }
    },

    async buildMenu() {
      console.log("vou chamar o buildMenuByUrl");
      const menu = await this.buildMenuByUrl();
      console.log("retornou:");
      console.log(menu);
      // iterate over menu and add icons
      menu.forEach((item) => {
        const menuItem = {
          title: item.label,
          icon: faIcon({ icon: "fa-solid fa-list-ul" }),
        };
        if (item.filhos) {
          menuItem.child = [];
          item.filhos.forEach((subItem) => {
            menuItem.child.push({
              href: subItem.url,
              title: subItem.label,
              icon: faIcon({ icon: "fa-solid fa-file-alt", size: "sm" }),
            });
          });
        } else {
          menuItem.href = item.url;
        }

        this.menu.push(menuItem);
      });

      // {
      //   href: "/page",
      //   title: "Dropdown Page",
      //   icon: faIcon({ icon: "fa-solid fa-list-ul" }),
      //   child: [
      //     {
      //       href: "/page/sub-page-1",
      //       title: "Sub Page 01",
      //       icon: faIcon({ icon: "fa-solid fa-file-alt", size: "sm" }),
      //     },
      //     {
      //       href: "/page/sub-page-2",
      //       title: "Sub Page 02",
      //       icon: faIcon({ icon: "fa-solid fa-file-alt", size: "sm" }),
      //     },
      //   ],
      // },

      this.menuKey++;
    },
  },
};
</script>

<style lang="scss">
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
