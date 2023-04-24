import { createApp } from "vue";
import { createPinia } from 'pinia'


import App from "./App.vue";

import "bootstrap";

import router from "./router/router.js";
import VueSidebarMenu from "vue-sidebar-menu";
import "vue-sidebar-menu/dist/vue-sidebar-menu.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";

import PrimeVue from "primevue/config";
import ToastService from "primevue/toastservice";
import ConfirmationService from "primevue/confirmationservice";

import primevueOptions from "@/primevue.config.js";
import "@/yup.locale.pt-br.js";

import "primeflex/primeflex.css";
import "primevue/resources/themes/bootstrap4-light-blue/theme.css"; // theme
import "primevue/resources/primevue.min.css"; // core css
import "primeicons/primeicons.css";

import "@/styles/app.css";
import "@/styles/primevue.css";
import "@/styles/crosier.css";

import "bootstrap/dist/css/bootstrap-reboot.css";
import "bootstrap/dist/css/bootstrap.css";

import "@fortawesome/fontawesome-free/css/all.css";


library.add(fas, far, fab);

const app = createApp(App);

app.use(router);
app.use(VueSidebarMenu);

app.component("font-awesome-icon", FontAwesomeIcon);


app.use(createPinia());

app.use(PrimeVue, primevueOptions);
app.use(ConfirmationService);
app.use(ToastService);

app.mount("#app");