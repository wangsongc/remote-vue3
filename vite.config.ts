import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import globalStyle from '@originjs/vite-plugin-global-style'
import federation from '@originjs/vite-plugin-federation'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [{
      find: '@',
      replacement: path.resolve(__dirname, 'src'),
    }],
  },
  server: {
    port: 3072
  },
  build:{
    rollupOptions: {
      external: 'semver/functions/satisfies',
    },
  },
  plugins:[
    vue(),
    globalStyle(),
    federation({
      name: 'remote',
      filename: 'remoteEntry.js',
      exposes: {
        './RemoteComponent': './src/components/HelloWorld.vue',
      },
      shared: ['vue'],
    }),
  ],
  define: {
    __VUE_I18N_FULL_INSTALL__: true,
    __VUE_I18N_LEGACY_API__: true,
  },
})
