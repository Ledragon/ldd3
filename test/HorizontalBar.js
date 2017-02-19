(function () {
    'use strict';
    var test = new ldd3.HorizontalBarChart('chart', 800, 600)
        .title('Horizontal bar chart')
        .padding(0.3)
        .x(d => d.values.length)
        .y(d => d.key)
        .color(d => colorScale(d.values.length));
    d3.json('data/CategoricalLinear.json', (error, data) => {
        test.update(data);
    });
}());