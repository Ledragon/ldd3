import resolve from 'rollup-plugin-node-resolve';
// import typescript from 'rollup-plugin-typescript';

export default {
    entry: 'index.js',
    dest: 'test/js/ldd3.js',
    format: 'umd',
    // sourceMap: 'inline',
    // globals: {
    //     d3: 'd3'
    // },
    // external: ['d3'],
    plugins: [
        // typescript({
        //     typescript: require('typescript')
        // }),
        resolve({
            jsnext: true,
            browser: true,
            main: true
        })
    ],
    moduleName: 'ldd3'
};