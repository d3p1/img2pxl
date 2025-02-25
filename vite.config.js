import glsl from 'vite-plugin-glsl'

export default {
  root: 'src/',
  base: '/img2pxl.js/',
  publicDir: '../public/',
  server: {
    host: true
  },
  build: {
    outDir: '../docs',
    emptyOutDir: true,
    sourcemap: true,
  },
  assetsInclude: [],
  plugins: [glsl()],
}