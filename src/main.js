import { createApp } from "vue";
import App from "./App.vue";

import "bootstrap";
import router from "./router";
import store from "./store";
import VueSidebarMenu from "vue-sidebar-menu";
import "vue-sidebar-menu/dist/vue-sidebar-menu.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";

import PrimeVue from "primevue/config";
import ToastService from "primevue/toastservice";
import primevueOptions from "crosier-vue/src/primevue.config.js";
import ConfirmationService from "primevue/confirmationservice";

import "bootstrap/dist/css/bootstrap.min.css";

import "primeflex/primeflex.css";
import "primevue/resources/themes/bootstrap4-light-blue/theme.css"; // theme
import "primevue/resources/primevue.min.css"; // core css
import "primeicons/primeicons.css";

import "crosier-vue/src/yup.locale.pt-br.js";

// import "./styles/app.css";
import "./styles/primevue.css";
import "./styles/crosier.css";

library.add(fas, far, fab);

const app = createApp(App);

app
  .use(router)
  .use(store)
  .use(VueSidebarMenu)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");

app.use(PrimeVue, primevueOptions);
app.use(ConfirmationService);
app.use(ToastService);
