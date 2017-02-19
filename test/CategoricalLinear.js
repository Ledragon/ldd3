(function () {
    'use strict';
    var test = new ldd3.CategoricalLinearChart('#chart', 800, 600)
        .title('Categorical linear chart')
        .x(d => d.Month)
        .y(d => parseInt(d['Regional Tourism Indicator (baseline 100)']))
        .groupBy(d => d.Year);
    d3.json('data/CategoricalLinear.json', (error, data) => {
        test.update(data);
    });
}());