import {resolve} from 'path'
import glsl from 'vite-plugin-glsl'
import dts from 'vite-plugin-dts'
import tailwindcss from '@tailwindcss/vite'
import {defineConfig} from 'vite'

export default defineConfig({
  base: '/img2pxl/',
  server: {
    host: true,
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/img2pxl.ts'),
      name: 'img2pxl',
    },
    sourcemap: true,
    rollupOptions: {
      external: ['three', 'tweakpane'],
    },
  },
  plugins: [glsl(), dts(), tailwindcss()],
})
