// import type { RollupOptions } from 'rollup'
import esbuild from 'rollup-plugin-esbuild'
import postcss from 'rollup-plugin-postcss'
import dts from 'rollup-plugin-dts'
import { dependencies } from './package.json'

const formats = ['es', 'cjs']

export default [
  {
    input: 'src/index.ts',
    output: formats.map(format => ({
      format,
      file: `dist/index.${format}.js`
    })),
    external: Object.keys(dependencies),
    plugins: [
      esbuild(),
      postcss({
        extensions: ['.css']
      })
    ]
  }
  // {
  //   input: 'src/index.ts',
  //   output: {
  //     file: `dist/index.d.ts`,
  //     format: 'es'
  //   },
  //   plugins: [dts()]
  // }
]
