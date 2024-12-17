// vite.config.mjs
import { fileURLToPath, URL } from 'node:url';
import { PrimeVueResolver } from '@primevue/auto-import-resolver';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import { defineConfig } from 'vite';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps: {
    noDiscovery: true,
    include: ['quill', 'mousetrap', 'tiny-case', 'property-expr', 'toposort', 'moment-timezone'],
  },
  plugins: [
    vue(),
    Components({
      resolvers: [PrimeVueResolver()],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      primevue: path.resolve(__dirname, './node_modules/primevue'),
    },
    // Adicionando suporte implícito a .vue
    extensions: ['.js', '.json', '.vue'],
  },
  server: {
    port: 4000,
  },
});
