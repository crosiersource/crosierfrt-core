/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from "@/plugins";

import router from "./router/router";

import { createPinia } from "pinia";

import "./yup.locale.pt-br.js";

// Components
import App from "./App.vue";

// Composables
import { createApp, markRaw } from "vue";

import { createVuetify } from "vuetify";

import "@fortawesome/fontawesome-free/css/all.css"; // Ensure your project is capable of handling css files
import { aliases, fa } from "vuetify/iconsets/fa";
const app = createApp(App);

import { pt } from "vuetify/locale";
const vuetify = createVuetify({
  locale: {
    locale: "pt",
    messages: { pt },
  },
  icons: {
    defaultSet: "fa",
    aliases,
    sets: {
      fa,
    },
  },
});

const pinia = createPinia();

pinia.use(({ store }) => {
  store.$router = markRaw(router);
});

registerPlugins(app);

app.use(router);

app.use(vuetify);

app.use(pinia);

app.mount("#app");
