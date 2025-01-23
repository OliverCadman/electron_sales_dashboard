// electron.vite.config.ts
import { resolve } from "path";
import { defineConfig, externalizeDepsPlugin } from "electron-vite";
import react from "@vitejs/plugin-react";
var __electron_vite_injected_dirname = "C:\\Users\\OliverCadman\\Documents\\workspace\\xander\\electron_sales_dashboard\\app";
var electron_vite_config_default = defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()],
    build: {
      copyPublicDir: true,
      rollupOptions: {
        external: ["better-sqlite3"]
      }
    }
  },
  preload: {
    plugins: [externalizeDepsPlugin()],
    build: {
      copyPublicDir: true,
      rollupOptions: {
        external: ["better-sqlite3"],
        input: {
          index: resolve(__electron_vite_injected_dirname, "src/preload/index.ts")
        }
      }
    }
  },
  renderer: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @import "./src/renderer/src/assets/_variables";
            @import "./src/renderer/src/components/gauge/_gauge";
            @import "./src/renderer/src/components/timer/_timer";
            @import "./src/renderer/src/assets/base";
            @import "./src/renderer/src/assets/_fonts";
          `
        }
      }
    },
    resolve: {
      alias: {
        "@renderer": resolve("src/renderer/src")
      }
    },
    plugins: [react()]
  }
});
export {
  electron_vite_config_default as default
};
