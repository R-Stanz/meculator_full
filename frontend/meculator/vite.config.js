import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  server: {
	  port:8000
  },
  plugins: [vue()],
  resolve: {
    alias: [{ find: "@", replacement: resolve(__dirname, "./src") }]
  }
})
