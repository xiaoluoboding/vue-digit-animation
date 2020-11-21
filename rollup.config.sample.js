// import babel from '@rollup/plugin-babel'
import cjs from '@rollup/plugin-commonjs'
import typescript from 'rollup-plugin-typescript2'
import postcss from 'rollup-plugin-postcss'
import filesize from 'rollup-plugin-filesize'
import vue from 'rollup-plugin-vue'
import { terser } from 'rollup-plugin-terser'
import autoprefixer from 'autoprefixer'

const isMinify = !!process.env.MINIFY

const plugins = [
  // babel({
  //   runtimeHelpers: true,
  //   exclude : 'node_modules/**'
  // }),
  vue(),
  typescript({
    include: [/\.tsx?$/, /\.vue\?.*?lang=ts/],
    useTsconfigDeclarationDir: true
  }),
  cjs({
    sourceMap: false
  }),
  filesize(),
  postcss({
    minimize: true,
    plugins: [autoprefixer()]
  }),
  terser({
    compress: {
      'drop_console': true
    }
  })
]

const buildOutput = fileName => {
  return [
    {
      file: isMinify
        ? `./lib/${fileName}.common.min.js`
        : `./lib/${fileName}.common.js`,
      format: 'cjs',
      sourcemap: false,
      exports: 'named',
      global: {
        vue: 'Vue'
      }
    },
    {
      file: isMinify
        ? `./lib/${fileName}.umd.min.js`
        : `./lib/${fileName}.umd.js`,
      format: 'umd',
      name: fileName,
      sourcemap: false,
      global: {
        vue: 'Vue'
      }
    }
  ]
}

// const buildOptions = components => {
//   return Object.keys(components).map(key => {
//     return {
//       input: components[key],
//       output: buildOutput(key),
//       plugins,
//       external: []
//     }
//   })
// }

export default {
  input: './src/index.ts',
  output: {
    file: isMinify
      ? `./lib/vue-digit-animation.common.min.js`
      : `./lib/vue-digit-animation.common.js`,
    format: 'cjs',
    sourcemap: false,
    exports: 'named'
  },
  plugins,
  external: ['vue']
}
