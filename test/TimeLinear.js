(function () {
    'use strict';
    const dateFormat = '%Y-%m';
    var test = new ldd3.TimeLinearChart('#chart', 960, 480)
        .x(d => d.timestamp)
        .y(d => d.total)
        .xFormat(dateFormat)
        .yFormat('$.0s')
        .title('Total trip amount per month')
        .color(d3.schemeCategory10[0]);

    d3.json('data/timeLinear.json', (error, data) => {
        data.forEach(d => {
            d.timestamp = new Date(d.timestamp);
        })
        test.update(data);
    });
}());