// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import path from 'path'
import dts from 'vite-plugin-dts'
import { defineConfig } from 'vite'

export default defineConfig({
  base: './',
  build: {
    lib: {
      entry: './src/index.ts',
      name: 'react-obect-state',
      fileName: (format) => `index.${format}.js`,
      formats: ['es'],
    },
    rollupOptions: {
      external: ['react'],
    },
    sourcemap: true,
    emptyOutDir: true,
  },
  plugins: [dts({ tsconfigPath: './tsconfig.app.json' })],
  resolve: {
    alias: [
      {
        find: 'src',
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        replacement: path.resolve(__dirname, './src/'),
      },
    ],
  },
})
