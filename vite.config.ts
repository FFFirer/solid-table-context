import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import tailwindcss from "@tailwindcss/vite";
import { resolve } from 'path';
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [tailwindcss(), solidPlugin(), dts({ include: ['src'] })],
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
    lib: {
      name: "SolidTableContext",
      entry: resolve(__dirname, "./src/index.tsx"),
      formats: ["es"],
      fileName: "index"
    },
    copyPublicDir: false,
    rollupOptions: {
        external: ['solid-js', 'solid-js/store', 'solid-js/universal', 'solid-js/web', 'solid-js/jsx-runtime']
    },
    cssCodeSplit: true
  },
  resolve: {
    alias: [
      {
        find: "@src",
        replacement: resolve(__dirname, "./src")
      },
      {
        find: "@docs",
        replacement: resolve(__dirname, "./docs")
      }
    ]
  }
});
