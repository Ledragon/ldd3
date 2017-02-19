(function () {
    'use strict';
    var test = new ldd3.HorizontalBarChart('chart', 800, 600)
        .title('Horizontal bar chart')
        .padding(0.3)
        .x(d => d.values.length)
        .y(d => d.key)
        .color(d => colorScale(d.values.length));
    
    let colorScale = d3.scaleLinear()
        .range(['#CBF7ED', '#EF626C']);
    d3.json('data/horizontalBar.json', (error, data) => {
        colorScale.domain([0, d3.max(data, d => d.values.length)]);
        test.update(data);        

    });
}());