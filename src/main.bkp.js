import { createApp, markRaw } from 'vue';
import App from './App.vue';
import router from './router';

import { createPinia } from 'pinia';

import BlockViewer from '@/components/BlockViewer.vue';
import Aura from '@primevue/themes/aura';
import PrimeVue from 'primevue/config';
import ConfirmationService from 'primevue/confirmationservice';
import ToastService from 'primevue/toastservice';

import '@/assets/styles.scss';
import '@/assets/tailwind.css';
import '@fortawesome/fontawesome-free/css/all.css';

const app = createApp(App);

app.use(router);
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: '.app-dark',
    },
  },
});

const pinia = createPinia();

pinia.use(({ store }) => {
  store.$router = markRaw(router);
});

app.use(ToastService);
app.use(ConfirmationService);

app.use(pinia);

app.component('BlockViewer', BlockViewer);

app.mount('#app');
