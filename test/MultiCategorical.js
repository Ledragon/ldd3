(function () {
    'use strict';
    var colors = ['pink', 'lightblue'];
    var test = new ldd3.MultiCategoricalChart('#chart', 960, 480)
        .x(d => d.orientation)
        .y(d => d.likelihood)
        .yFormat('0.0%')
        .color(i => colors[i])
        .groupBy(d => d.gender)
        .title('Likelihood of orgasm');

    d3.json('data/multiCategorical.json', (error, data) => {
        test.update(data, [0, 1]);
    });
}());