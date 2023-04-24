import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import { resolve } from 'path'

const fs = require('fs');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    https: {
      key: fs.readFileSync("./certs/crosier.frt.key"),
      cert: fs.readFileSync("./certs/crosier.frt.crt"),
    },
    host: "core.crosier.frt",
    // port: 443,
    watch: {
      ignored: [
        '!/home/carlos/dev/github/crosierfrt-core/**',
        '/home/carlos/**'
      ]
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/components/index.js'),
      name: 'crosierfrt-core',
      fileName: (format) => `crosierfrt-core.${format}.js`,
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        // Provide global variables to use in the UMD build
        // Add external deps here
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
})
