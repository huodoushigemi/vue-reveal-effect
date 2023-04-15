import { defineConfig } from 'rollup'
import esbuild from 'rollup-plugin-esbuild'
import typescript from '@rollup/plugin-typescript'
import postcss from 'rollup-plugin-postcss'
import { dependencies } from './package.json'

const formats = {
  esm: 'mjs',
  cjs: 'cjs'
}

export default defineConfig({
  input: 'src/index.ts',
  output: Object.entries(formats).map(([format, ext]) => ({
    format,
    file: `./dist/index.${ext}`
  })),
  external: Object.keys(dependencies),
  // prettier-ignore
  plugins: [
    esbuild(),
    postcss(),
    typescript({ declaration: true, emitDeclarationOnly: true }),
  ]
})
