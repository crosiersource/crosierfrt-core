import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import eslintPlugin from "vite-plugin-eslint";
import path from "path";
import fs from "fs";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    https: {
      key: fs.readFileSync("./certs/crosier.frt.key"),
      cert: fs.readFileSync("./certs/crosier.frt.crt"),
    },
    host: "core.crosier.frt",
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
