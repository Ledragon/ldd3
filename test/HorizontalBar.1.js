(function () {
    'use strict';
    var test = new ldd3.HorizontalBarChart('#chart2', 800, 600)
        .x(d => d.price)
        .y(d => d.country)
        .title('Potato selling price (€/100kg)')
        .color(() => 'red');
    var byYear;
     let slider = new ldd3.Slider('#slider', 800, 60)
        .on('click', (d, i) => {
            test.update(byYear[i].values.sort((a, b) => b.price - a.price));
        });
    let colorScale = d3.scaleLinear()
        .range(['#CBF7ED', '#EF626C']);
    d3.json('data/ChanginBar.json', (error, data) => {
        colorScale.domain([0, d3.max(data, d => d.values.length)]);
        test.update(data[0].values.sort((a,b)=>b.price-a.price));        
        slider.domain(d3.extent(data, d => d.key));
        byYear = data;

    });
}());