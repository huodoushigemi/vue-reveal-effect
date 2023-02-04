import { defineConfig } from 'rollup'
import esbuild from 'rollup-plugin-esbuild'
import typescript from '@rollup/plugin-typescript'
import postcss from 'rollup-plugin-postcss'
import { dependencies } from './package.json'

const formats = ['esm', 'cjs']

export default defineConfig({
  input: 'src/index.ts',
  output: formats.map(format => ({
    format,
    file: `./dist/index.${format}.js`
  })),
  external: Object.keys(dependencies),
  // prettier-ignore
  plugins: [
    esbuild(),
    postcss(),
    typescript({ declaration: true, emitDeclarationOnly: true }),
  ]
})
