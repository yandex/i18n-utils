import pkg from './package.json';
import esbuild from 'rollup-plugin-esbuild';

export default [
    {
        input: './src/index.ts',
        output: [{ file: pkg.main, format: 'cjs', exports: 'named' }],
        plugins: [
            esbuild.default({
                minify: true,
            }),
        ],
    },
];
