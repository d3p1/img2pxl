import {resolve} from 'path'
import glsl from 'vite-plugin-glsl'
import dts from 'vite-plugin-dts'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import {defineConfig} from 'vite'
import {preserveDirective} from 'rollup-preserve-directives'

export default defineConfig({
  base: '/img2pxl/',
  server: {
    host: true,
  },
  build: {
    lib: {
      entry: {
        'core/index': resolve(__dirname, 'src/core/index.ts'),
        'react/index': resolve(__dirname, 'src/react/index.ts'),
      },
      formats: ['es'],
    },
    sourcemap: true,
    rollupOptions: {
      external: ['three', 'tweakpane', 'react', 'react-dom'],
    },
  },
  plugins: [
    react(),
    glsl(),
    tailwindcss(),
    dts({
      tsconfigPath: resolve(__dirname, 'tsconfig.app.json'),
      exclude: ['node_modules/**', 'dev/**'],
    }),
    preserveDirective()
  ],
})
