import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.js',
    coverage: {
      include: ['src/utils/**', 'src/services/**', 'src/context/**', 'src/hooks/**'],
      reporter: ['text', 'html'],
    },
  },
})
