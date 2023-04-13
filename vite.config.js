import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import eslintPlugin from "vite-plugin-eslint";
import path from "path";
import fs from "fs";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    https: {
      key: fs.readFileSync("certs/crosier.dev.key"),
      cert: fs.readFileSync("certs/crosier.dev.crt"),
    },
    host: "core.crosier.dev",
    // port: 443,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  plugins: [
    vue(),
    eslintPlugin({
      overrideConfig: {
        ignorePatterns: ["*crosier*.js"],
      },
    }),
  ],
  configureWebpack: {
    resolve: {
      symlinks: false,
    },
  },
});
