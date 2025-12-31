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
      entry: {
        core: resolve(__dirname, 'src/core/index.ts'),
      },
      formats: ['es'],
    },
    sourcemap: true,
    rollupOptions: {
      external: ['three', 'tweakpane'],
    },
  },
  plugins: [
    glsl(),
    dts({exclude: ['node_modules/**', 'dev/**']}),
    tailwindcss(),
  ],
})
