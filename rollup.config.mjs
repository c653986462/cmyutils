import typescript from '@rollup/plugin-typescript'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';

export default {
  input: 'src/index.ts',
  output: {
    file: 'dist/index.js',
    format: 'cjs'
  },
  plugins: [
    commonjs(),
    resolve({ moduleDirectories: ['node_modules'] }),
    babel({ babelHelpers: 'bundled' }),
    typescript({
      tsconfig: './tsconfig.json'
    }),
  ],
	// 指出哪些模块应该视为外部模块
	external: []
}