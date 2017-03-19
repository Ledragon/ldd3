(function () {
    'use strict';
    var test = new ldd3.LinearLinearChart('#chart', 800, 600)
        .title('Linear linear chart')
        .x(d => d.videoViews)
        .xFormat('.2g')
        .y(d => d.subscribers)
        .yFormat('.2g')
        .hasLine(false)
        .hasPoints(true);
    
    d3.json('data/LinearLinear.json', (error, data) => {
        test.update(data);        
    });
}());