import resolve from 'rollup-plugin-node-resolve';

const d3Array = [
    'd3-array',
    'd3-axis',
    'd3-collection',
    'd3-dispatch',
    'd3-format',
    'd3-scale',
    'd3-selection',
    'd3-shape',
    'd3-time-format'
];
var globals = {};
for (var i = 0; i < d3Array.length; i++) {
    globals[d3Array[i]] = 'd3';
}
export default {
    entry: 'src/d3-bundle.js',
    dest: 'test/js/d3.js',
    format: 'umd',
    // globals: globals,
    // external: d3Array,
    plugins: [
        resolve({
            jsnext: true,
            browser: true,
            main: true
        })
    ],
    moduleName: 'd3'
};