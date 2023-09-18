import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';

/**
 * Config is based on https://github.com/Microsoft/TypeScript-Babel-Starter#using-rollup
 */

const extensions = [
	'.js', '.ts',
];

export default {
	input: 'index.ts',
	output: [
		{file: 'index.cjs.js', format: 'cjs', sourcemap: true, exports: 'named'},
		{file: 'index.es.mjs', format: 'es', sourcemap: true, exports: 'named'}
	],
	external: [
		"stylelint"
	],
	plugins: [
		resolve({ extensions }),
		babel({
			extensions,
			babelHelpers: 'bundled',
			include: ['./lib/**/*', './index.ts'],
		}),
	]
};
