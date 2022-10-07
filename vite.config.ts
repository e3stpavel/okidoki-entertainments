import * as path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      'react-native': 'react-native-web',
      '~/': `${path.resolve(__dirname, 'src')}`,
      '@/': `${path.resolve(__dirname, 'web/src')}`,
    },
  },
  root: './web',
  publicDir: './assets',
  // cacheDir: '',
  server: {
    port: 3000,
  },
})
