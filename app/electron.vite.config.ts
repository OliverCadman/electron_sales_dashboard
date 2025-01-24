import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()],
    build: {
      copyPublicDir: true,
      rollupOptions: {
        external: ['better-sqlite3']
      }
    }
  },
  preload: {
    plugins: [externalizeDepsPlugin()],
    build: {
      copyPublicDir: true,
      rollupOptions: {
        external: ['better-sqlite3'],
        input: {
          index: resolve(__dirname, 'src/preload/index.ts')
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
            @import "./src/renderer/src/components/modal/_modal";
            @import "./src/renderer/src/components/show-modal-button/_show-modal-button";
            @import "./src/renderer/src/assets/base";
            @import "./src/renderer/src/assets/_fonts";
          `
        }
      }
    },
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src')
      }
    },
    plugins: [react()]
  }
})
