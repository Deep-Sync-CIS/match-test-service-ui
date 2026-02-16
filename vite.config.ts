import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/match-test-service/',
  plugins: [
    react(),
    federation({
      name: 'match_test_service_ui',
      filename: 'remoteEntry.js',
      exposes: {
        './App': './src/App',
      },
      shared: {
        react: {
          requiredVersion: '18.2.0',
          import: false,
          singleton: true,
          generate: false,
        },
        'react-dom': {
          requiredVersion: '18.2.0',
          import: false,
          singleton: true,
          generate: false,
        },
        'react-router-dom': {
          requiredVersion: '6.20.0',
          import: false,
          singleton: true,
          generate: false,
        },
        'react/jsx-runtime': {
          requiredVersion: '18.2.0',
          import: false,
          singleton: true,
          generate: false,
        },
        'react/jsx-dev-runtime': {
          requiredVersion: '18.2.0',
          import: false,
          singleton: true,
          generate: false,
        },
        zustand: {
          requiredVersion: '^4.5.0',
          import: false,
          singleton: true,
          generate: false,
        },
        '@tanstack/react-query': {
          requiredVersion: '^5.17.0',
          import: false,
          singleton: true,
          generate: false,
        },
      } as Record<string, { requiredVersion?: string; import?: boolean; singleton?: boolean; generate?: boolean }>,
    }),
  ],
  server: {
    port: 3002,
    open: true,
  },
  build: {
    outDir: 'dist',
    target: 'esnext',
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        // Do not put shared deps in vendor so the remote uses host's shared instances
        manualChunks: (id) => {
          const path = String(id)
          if (
            path.indexOf('node_modules') !== -1 &&
            !/node_modules[\\/](react|react-dom|react-router-dom|zustand|@tanstack[\\/]react-query)[\\/]/.test(path)
          ) {
            return 'vendor'
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
  optimizeDeps: {
    exclude: ['__federation__'],
  },
  preview: {
    port: 4175,
    open: true,
  },
})
