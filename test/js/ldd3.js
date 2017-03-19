(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('d3-array'), require('d3-axis'), require('d3-collection'), require('d3-dispatch'), require('d3-format'), require('d3-scale'), require('d3-selection'), require('d3-shape'), require('d3-time-format')) :
	typeof define === 'function' && define.amd ? define(['exports', 'd3-array', 'd3-axis', 'd3-collection', 'd3-dispatch', 'd3-format', 'd3-scale', 'd3-selection', 'd3-shape', 'd3-time-format'], factory) :
	(factory((global.ldd3 = global.ldd3 || {}),global.d3,global.d3,global.d3,global.d3,global.d3,global.d3,global.d3,global.d3,global.d3));
}(this, (function (exports,d3,d3$1,d3$2,d3$3,d3$4,d3$5,d3$6,d3$7,d3$8) { 'use strict';

//# sourceMappingURL=d3-bundle.js.map

var BottomCategoricalAxis = (function () {
    /**
     * Create a new BottomCategoricalAxis.
     * @param container - the svg element to which the axis will be appended.
     * @param _width - the width of the container.
     * @param _height - the height of the container.
     */
    function BottomCategoricalAxis(container, _width, _height) {
        this._width = _width;
        this._height = _height;
        this._group = container.append('g')
            .classed('axis', true)
            .attr('transform', "translate(" + 0 + "," + _height + ")");
        this._scale = d3$5.scaleBand()
            .range([0, _width]);
        this._axis = d3$1.axisBottom(this._scale);
    }
    /**
     * Get the group in which the axis is drawn.
     */
    BottomCategoricalAxis.prototype.group = function () {
        return this._group;
    };
    BottomCategoricalAxis.prototype.domain = function (value) {
        if (arguments.length) {
            this._scale.domain(value);
            this._group.call(this._axis);
            return this;
        }
        else {
            return this._scale.domain();
        }
    };
    BottomCategoricalAxis.prototype.padding = function (value) {
        this._scale.padding(value);
        return this;
    };
    BottomCategoricalAxis.prototype.scale = function (value) {
        return this._scale(value);
    };
    BottomCategoricalAxis.prototype.bandWidth = function () {
        return this._scale.bandwidth();
    };
    return BottomCategoricalAxis;
}());

//# sourceMappingURL=BottomCategoricalAxis.js.map

var BottomLinearAxis = (function () {
    function BottomLinearAxis(container, _width, _height) {
        this._width = _width;
        this._height = _height;
        var xScale = d3$5.scaleLinear()
            .range([0, this._width]);
        var fmt = d3$4.format('0');
        var xAxis = d3$1.axisBottom(xScale)
            .tickFormat(function (d) { return fmt(d); });
        var xAxisGroup = container.append('g')
            .classed('horizontal axis', true)
            .attr('transform', "translate(" + 0 + "," + this._height + ")");
        this._scale = xScale;
        this._group = xAxisGroup;
        this._axis = xAxis;
    }
    BottomLinearAxis.prototype.domain = function (value) {
        this._scale.domain(value);
        this._group.call(this._axis);
        return this;
    };
    BottomLinearAxis.prototype.format = function (value) {
        this._axis.tickFormat(d3$4.format(value));
        return this;
    };
    BottomLinearAxis.prototype.scale = function (value) {
        return this._scale(value);
    };
    return BottomLinearAxis;
}());

//# sourceMappingURL=BottomLinearAxis.js.map

var BottomTimeAxis = (function () {
    function BottomTimeAxis(container, _width, _height) {
        this._width = _width;
        this._height = _height;
        var xScale = d3$5.scaleTime()
            .range([0, this._width]);
        var xAxis = d3$1.axisBottom(xScale);
        var xAxisGroup = container.append('g')
            .classed('horizontal axis', true)
            .attr('transform', "translate(" + 0 + "," + this._height + ")");
        this._scale = xScale;
        this._group = xAxisGroup;
        this._axis = xAxis;
    }
    BottomTimeAxis.prototype.format = function (value) {
        this._axis.tickFormat(d3$8.timeFormat(value));
        return this;
    };
    BottomTimeAxis.prototype.domain = function (value) {
        this._scale.domain(value);
        this._group.call(this._axis);
        return this;
    };
    BottomTimeAxis.prototype.scale = function (value) {
        return this._scale(value);
    };
    return BottomTimeAxis;
}());

//# sourceMappingURL=BottomTimeAxis.js.map

var LeftCategoricalAxis = (function () {
    function LeftCategoricalAxis(container, _width, _height) {
        this._width = _width;
        this._height = _height;
        this._group = container.append('g')
            .classed('axis', true)
            .attr('transform', "translate(" + 0 + "," + 0 + ")");
        this._scale = d3$5.scaleBand()
            .range([0, _height]);
        this._axis = d3$1.axisLeft(this._scale);
    }
    LeftCategoricalAxis.prototype.group = function () {
        return this._group;
    };
    LeftCategoricalAxis.prototype.domain = function (value) {
        if (arguments.length) {
            this._scale.domain(value);
            this._group.call(this._axis);
            return this;
        }
        else {
            return this._scale.domain();
        }
    };
    LeftCategoricalAxis.prototype.scale = function (value) {
        return this._scale(value);
    };
    LeftCategoricalAxis.prototype.bandWidth = function () {
        return this._scale.bandwidth();
    };
    LeftCategoricalAxis.prototype.padding = function (value) {
        if (arguments.length) {
            this._scale.padding(value);
            return this;
        }
        else {
            return this._scale.padding();
        }
    };
    return LeftCategoricalAxis;
}());

//# sourceMappingURL=LeftCategoricalAxis.js.map

var LeftLinearAxis = (function () {
    function LeftLinearAxis(container, _width, _height) {
        this._width = _width;
        this._height = _height;
        this._group = container.append('g')
            .classed('axis', true);
        this._scale = d3$5.scaleLinear()
            .range([_height, 0]);
        this._axis = d3$1.axisLeft(this._scale);
    }
    LeftLinearAxis.prototype.group = function () {
        return this._group;
    };
    LeftLinearAxis.prototype.domain = function (value) {
        if (arguments.length) {
            this._scale.domain(value).nice();
            this._group.call(this._axis);
            return this;
        }
        else {
            return this._scale.domain();
        }
    };
    LeftLinearAxis.prototype.format = function (specifier) {
        this._axis.tickFormat(d3$4.format(specifier));
        return this;
    };
    LeftLinearAxis.prototype.scale = function (value) {
        return this._scale(value);
    };
    LeftLinearAxis.prototype.ticks = function () {
        return this._scale.ticks();
    };
    return LeftLinearAxis;
}());

//# sourceMappingURL=LeftLinearAxis.js.map

var TopLinearAxis = (function () {
    function TopLinearAxis(container, _width, _height) {
        this._width = _width;
        this._height = _height;
        var xScale = d3$5.scaleLinear()
            .range([0, this._width]);
        var fmt = d3$4.format('0');
        var xAxis = d3$1.axisTop(xScale)
            .tickFormat(function (d) { return fmt(d); });
        var xAxisGroup = container.append('g')
            .classed('horizontal axis', true)
            .attr('transform', "translate(" + 0 + "," + 0 + ")");
        this._scale = xScale;
        this._group = xAxisGroup;
        this._axis = xAxis;
    }
    TopLinearAxis.prototype.domain = function (value) {
        this._scale.domain(value).nice();
        this._group.call(this._axis);
        return this;
    };
    TopLinearAxis.prototype.scale = function (value) {
        return this._scale(value);
    };
    return TopLinearAxis;
}());

//# sourceMappingURL=TopLinearAxis.js.map

// import BottomCategoricalAxis ;

//# sourceMappingURL=Axes.js.map

var title = (function () {
    function title(container, width, height) {
        this._group = container.append('g')
            .classed('chart-title', true)
            .attr('transform', "translate(" + width / 2 + "," + 30 + ")");
        this._group.append('text');
    }
    title.prototype.text = function (value) {
        this._group.select('text').text(value);
    };
    title.prototype.classed = function (value) {
        this._group.classed(value, true);
    };
    return title;
}());

//# sourceMappingURL=title.js.map

var ChartContainer = (function () {
    function ChartContainer(container, width, height, margins) {
        this._parent = container;
        var chartContainerMargins = margins;
        var chartContainerGroup = container.append('g')
            .attr('transform', "translate(" + chartContainerMargins.left + "," + chartContainerMargins.top + ")");
        var chartContainerWidth = width - chartContainerMargins.left - chartContainerMargins.right;
        var chartContainerHeight = height - chartContainerMargins.top - chartContainerMargins.bottom;
        this._chartContainerWidth = chartContainerWidth;
        this._chartContainerHeight = chartContainerHeight;
        this._group = chartContainerGroup;
    }
    ChartContainer.prototype.parent = function () {
        return this._parent;
    };
    ChartContainer.prototype.group = function () {
        return this._group;
    };
    ChartContainer.prototype.width = function () {
        return this._chartContainerWidth;
    };
    ChartContainer.prototype.height = function () {
        return this._chartContainerHeight;
    };
    return ChartContainer;
}());

//# sourceMappingURL=ChartContainer.js.map

function GetContainer(selector, width, height, margins) {
    var svg = d3$6.select(selector)
        .append('svg')
        .attr('width', width)
        .attr('height', height);
    return new ChartContainer(svg, width, height, margins);
}
//# sourceMappingURL=plotFactory.js.map

var HorizontalBarChart = (function () {
    function HorizontalBarChart(selector, _width, _height) {
        this._width = _width;
        this._height = _height;
        var plotMargins = {
            top: 60,
            bottom: 30,
            left: 120,
            right: 30
        };
        var p = GetContainer(selector, this._width, this._height, plotMargins);
        var plotGroup = p.group();
        var plotHeight = p.height();
        var plotWidth = p.width();
        this._title = new title(d3$6.select(selector).select('svg'), this._width, this._height);
        this._yAxis = new LeftCategoricalAxis(plotGroup, plotWidth, plotHeight)
            .padding(0.5);
        this._xScale = d3$5.scaleLinear()
            .range([0, plotWidth]);
        this._seriesGroup = plotGroup.append('g')
            .classed('series-group', true);
        this._color = function () { return 'lightgray'; };
    }
    HorizontalBarChart.prototype.x = function (value) {
        this._x = value;
        return this;
    };
    HorizontalBarChart.prototype.y = function (value) {
        this._y = value;
        return this;
    };
    HorizontalBarChart.prototype.padding = function (value) {
        this._yAxis.padding(value);
        return this;
    };
    HorizontalBarChart.prototype.title = function (value) {
        this._title.text(value);
        return this;
    };
    HorizontalBarChart.prototype.color = function (value) {
        this._color = value;
        return this;
    };
    HorizontalBarChart.prototype.format = function (value) {
        this._format = d3$4.format(value);
        return this;
    };
    HorizontalBarChart.prototype.update = function (data) {
        var _this = this;
        this._yAxis.domain(data.map(this._y));
        this._xScale.domain([0, d3.max(data, this._x)]);
        var dataBound = this._seriesGroup.selectAll('.series')
            .data(data);
        dataBound
            .exit()
            .remove();
        var enterSelection = dataBound
            .enter()
            .append('g')
            .classed('series', true);
        var rect = enterSelection.append('rect')
            .attr('x', 0)
            .attr('y', 0)
            .attr('height', this._yAxis.bandWidth())
            .style('stroke', 'none');
        enterSelection.append('text')
            .classed('bar-label', true)
            .attr('y', this._yAxis.bandWidth() / 2);
        var merged = enterSelection.merge(dataBound);
        merged.attr('transform', function (d, i) { return "translate(" + 0 + "," + _this._yAxis.scale(_this._y(d)) + ")"; });
        merged.select('rect')
            .attr('width', function (d) { return _this._xScale(_this._x(d)); })
            .style('fill', function (d) { return _this._color(d); });
        merged.select('text')
            .attr('x', function (d) { return _this._xScale(_this._x(d)) + (_this._xScale(_this._x(d)) < 30 ? 25 : -5); })
            .text(function (d) { return _this._format ? _this._format(_this._x(d)) : _this._x(d); });
    };
    return HorizontalBarChart;
}());

var LinearLinearChart = (function () {
    function LinearLinearChart(containerId, _width, _height) {
        this._width = _width;
        this._height = _height;
        this._hasLine = true;
        this._hasPoints = false;
        this._pointColor = function () { return 'lightgray'; };
        var margins = {
            top: 60,
            bottom: 30,
            left: 60,
            right: 30
        };
        var p = GetContainer('#' + containerId, this._width, this._height, margins);
        var group = p.group();
        var container = group.append('g')
            .classed('chart-container', true);
        var plotWidth = p.width();
        var plotHeight = p.height();
        this._xAxis = new BottomLinearAxis(container, plotWidth, plotHeight);
        this._yAxis = new LeftLinearAxis(container, plotWidth, plotHeight)
            .format('s');
        this.initPathGenerator(container);
        this._pointsGroup = container.append('g')
            .classed('points', true);
        this._title = new title(p.parent(), this._width, this._height);
        this._x = function (d) { return d.x; };
        this._y = function (d) { return d.y; };
    }
    LinearLinearChart.prototype.hasLine = function (value) {
        this._hasLine = value;
        return this;
    };
    LinearLinearChart.prototype.hasPoints = function (value) {
        this._hasPoints = value;
        return this;
    };
    LinearLinearChart.prototype.pointColor = function (value) {
        this._pointColor = value;
        return this;
    };
    LinearLinearChart.prototype.x = function (value) {
        this._x = value;
        return this;
    };
    LinearLinearChart.prototype.xFormat = function (value) {
        this._xAxis.format(value);
        return this;
    };
    LinearLinearChart.prototype.y = function (value) {
        this._y = value;
        return this;
    };
    LinearLinearChart.prototype.yFormat = function (value) {
        this._yAxis.format(value);
        return this;
    };
    LinearLinearChart.prototype.title = function (value) {
        this._title.text(value);
        return this;
    };
    LinearLinearChart.prototype.update = function (data, xDomain, yDomain) {
        var _this = this;
        if (!xDomain) {
            xDomain = d3.extent(data, function (d) { return _this._x(d); });
        }
        if (!yDomain) {
            yDomain = d3.extent(data, function (d) { return _this._y(d); });
        }
        this._xAxis.domain(xDomain);
        this._yAxis.domain(yDomain);
        this._pathGroup
            .attr('d', this._pathGenerator(data))
            .style('visibility', this._hasLine ? 'visible' : 'hidden');
        var dataBound = this._pointsGroup.selectAll('.point')
            .data(data);
        dataBound
            .exit()
            .remove();
        var enterSelection = dataBound
            .enter()
            .append('g')
            .classed('point', true);
        enterSelection.append('circle')
            .attr('r', 2);
        var merged = enterSelection.merge(dataBound);
        merged.style('visibility', this._hasPoints ? 'visible' : 'hidden');
        merged.select('circle')
            .attr('cx', function (d) { return _this._xAxis.scale(_this._x(d)); })
            .attr('cy', function (d) { return _this._yAxis.scale(_this._y(d)); })
            .style('fill', function (d, i) { return _this._pointColor(d, i); });
    };
    LinearLinearChart.prototype.initPathGenerator = function (container) {
        var _this = this;
        this._pathGenerator = d3$7.line()
            .x(function (d) { return _this._xAxis.scale(_this._x(d)); })
            .y(function (d) { return _this._yAxis.scale(_this._y(d)); });
        this._pathGroup = container.append('g')
            .append('path')
            .classed('trace', true)
            .style('fill', 'none');
    };
    return LinearLinearChart;
}());

//# sourceMappingURL=LinearLinearChart.js.map

var Legend = (function () {
    function Legend(container, _width, _height) {
        var _this = this;
        this._width = _width;
        this._height = _height;
        this._legendWidth = 90;
        this._itemHeight = 20;
        this._legend = container.append('g')
            .classed('legend', true)
            .attr('transform', function (d, i) { return "translate(" + -_this._legendWidth + "," + 0 + ")"; });
        this._legend.append('rect')
            .classed('legend-rect', true)
            .style('fill', 'none')
            .style('stroke', 'lightgray');
    }
    Legend.prototype.label = function (value) {
        if (arguments.length) {
            this._label = value;
        }
        return this;
    };
    Legend.prototype.color = function (value) {
        if (arguments.length) {
            this._color = value;
        }
        return this;
    };
    Legend.prototype.update = function (data) {
        var _this = this;
        var legendBound = this._legend.selectAll('.legend-item')
            .data(function (d) { return data; });
        legendBound.exit().remove();
        var enterLegend = legendBound
            .enter()
            .append('g')
            .classed('legend-item', true)
            .attr('transform', function (d, i) { return "translate(" + 10 + "," + (i * 20 + 10) + ")"; });
        enterLegend.append('rect')
            .attr('width', 10)
            .attr('height', 10)
            .style('fill', function (d, i) { return _this._color(d, i); });
        enterLegend.append('text')
            .attr('x', 15)
            .attr('y', 9)
            .text(function (d, i) { return _this._label(d, i); });
        var legendHeight = data.length * this._itemHeight + 10;
        this._legend
            .attr('transform', function (d, i) { return "translate(" + -_this._legendWidth + "," + -legendHeight + ")"; });
        this._legend.select('rect.legend-rect')
            .attr('width', this._legendWidth - 10)
            .attr('height', legendHeight);
    };
    return Legend;
}());

//# sourceMappingURL=Legend.js.map

var CategoricalLinearChart = (function () {
    function CategoricalLinearChart(selector, _width, _height) {
        var _this = this;
        this._width = _width;
        this._height = _height;
        var plotMargins = {
            top: 60,
            bottom: 30,
            left: 60,
            right: 90
        };
        var container = GetContainer(selector, _width, _height, plotMargins);
        this._group = container.group();
        var plotGroup = container.group();
        var plotWidth = container.width();
        var plotHeight = container.height();
        this._xAxis = new BottomCategoricalAxis(this._group, plotWidth, plotHeight);
        this._yAxis = new LeftLinearAxis(plotGroup, plotWidth, plotHeight);
        this._lineGenerator = d3$7.line()
            .curve(d3$7.curveStep)
            .x(function (d, i) { return _this._xAxis.scale(_this._x(d, i)) + _this._xAxis.bandWidth() / 2; })
            .y(function (d, i) { return _this._yAxis.scale(_this._y(d, i)); });
        var legendWidth = 90;
        var legendContainer = container.parent()
            .append('g')
            .attr('transform', function (d, i) { return "translate(" + _this._width + "," + _this._height / 2 + ")"; });
        this._legend = new Legend(legendContainer, this._width, plotHeight)
            .label(function (d) { return d.key; })
            .color(function (d, i) { return d3$5.schemeCategory10[i]; });
        this._title = new title(container.parent(), _width, _height);
    }
    CategoricalLinearChart.prototype.x = function (value) {
        if (arguments.length) {
            this._x = value;
        }
        return this;
    };
    CategoricalLinearChart.prototype.y = function (value) {
        if (arguments.length) {
            this._y = value;
        }
        return this;
    };
    CategoricalLinearChart.prototype.groupBy = function (value) {
        if (arguments.length) {
            this._groupBy = value;
        }
        return this;
    };
    CategoricalLinearChart.prototype.title = function (value) {
        this._title.text(value);
        return this;
    };
    CategoricalLinearChart.prototype.update = function (data) {
        var _this = this;
        this._xAxis.domain(data.map(function (d, i) { return _this._x(d, i); }));
        this._yAxis.domain([0, d3.max(data, function (d, i) { return _this._y(d, i); })]);
        var grouped = d3$2.nest()
            .key(function (d) { return _this._groupBy(d); })
            .entries(data);
        var dataBound = this._group.selectAll('.series')
            .data(grouped);
        dataBound.exit()
            .remove();
        var enterSelection = dataBound
            .enter()
            .append('g')
            .classed('year-series', true);
        enterSelection.append('path')
            .attr('d', function (d) { return _this._lineGenerator(d.values); })
            .style('stroke', function (d, i) { return d3$5.schemeCategory10[i]; });
        this._legend.update(grouped);
    };
    return CategoricalLinearChart;
}());

//# sourceMappingURL=CategoricalLinearChart.js.map

var TimeLinearChart = (function () {
    function TimeLinearChart(selector, width, height) {
        var svg = d3$6.select(selector)
            .append('svg')
            .attr('width', width)
            .attr('height', height);
        this._group = svg;
        var plotMargins = {
            top: 60,
            bottom: 30,
            left: 60,
            right: 30
        };
        svg.append('g')
            .classed('title', true)
            .attr('transform', function (d, i) { return "translate(" + width / 2 + "," + 30 + ")"; })
            .append('text');
        //TODO avoid nasty casting        
        var plotGroup = svg.append('g')
            .classed('plot', true)
            .attr('transform', "translate(" + plotMargins.left + "," + plotMargins.top + ")");
        var plotWidth = width - plotMargins.left - plotMargins.right;
        var plotHeight = height - plotMargins.top - plotMargins.bottom;
        this._timeAxis = new BottomTimeAxis(plotGroup, plotWidth, plotHeight);
        this._leftAxis = new LeftLinearAxis(plotGroup, plotWidth, plotHeight);
        this._lineGenerator = d3$7.line();
        var group = plotGroup.append('g');
        this._path = group.append('path')
            .style('fill', 'none')
            .style('stroke', 'lightgray');
    }
    TimeLinearChart.prototype.color = function (value) {
        this._path.style('stroke', value);
        return this;
    };
    TimeLinearChart.prototype.x = function (value) {
        var _this = this;
        if (arguments.length) {
            this._x = value;
            this._lineGenerator.x(function (d, i) { return _this._timeAxis.scale(_this._x(d, i)); });
        }
        return this;
    };
    TimeLinearChart.prototype.y = function (value) {
        var _this = this;
        if (arguments.length) {
            this._y = value;
            this._lineGenerator.y(function (d, i) { return _this._leftAxis.scale(_this._y(d, i)); });
        }
        return this;
    };
    TimeLinearChart.prototype.xFormat = function (value) {
        this._timeAxis.format(value);
        return this;
    };
    TimeLinearChart.prototype.yFormat = function (value) {
        this._leftAxis.format(value);
        return this;
    };
    TimeLinearChart.prototype.title = function (value) {
        this._group.select('.title')
            .select('text')
            .text(value);
        return this;
    };
    TimeLinearChart.prototype.update = function (data) {
        var _this = this;
        this._timeAxis.domain(d3.extent(data, function (d, i) { return _this._x(d, i); }));
        this._leftAxis.domain([0, d3.max(data, function (d, i) { return _this._y(d, i); })]);
        this._path.attr('d', this._lineGenerator(data));
    };
    return TimeLinearChart;
}());

//# sourceMappingURL=TimeLinearChart.js.map

var MultiCategoricalChart = (function () {
    function MultiCategoricalChart(selector, _width, _height) {
        var _this = this;
        this._width = _width;
        this._height = _height;
        this._colorScale = function (i) { return d3$5.schemeCategory20[i]; };
        var plotMargins = {
            top: 60,
            bottom: 30,
            left: 90,
            right: 210
        };
        var container = GetContainer(selector, _width, _height, plotMargins);
        this._group = container.group();
        this._xAxis = new BottomCategoricalAxis(this._group, container.width(), container.height())
            .padding(0.3);
        this._yAxis = new LeftLinearAxis(this._group, container.width(), container.height());
        this._x = function (d) { return d.category; };
        this._y = function (d) { return d.value; };
        this._seriesGroup = this._group.append('g')
            .classed('series', true);
        this._plotHeight = container.height();
        var legendContainer = container.parent()
            .append('g')
            .classed('legend-container', true)
            .attr('transform', "translate(" + (container.width() + plotMargins.left + plotMargins.right) + "," + container.height() / 2 + ")");
        this._legend = new Legend(legendContainer, container.width(), container.height())
            .color(function (d, i) { return _this._colorScale(i); })
            .label(function (d) { return d; });
        this._title = new title(container.parent(), _width, _height);
    }
    MultiCategoricalChart.prototype.color = function (value) {
        if (value) {
            this._colorScale = value;
        }
        return this;
    };
    MultiCategoricalChart.prototype.title = function (value) {
        this._title.text(value);
        return this;
    };
    MultiCategoricalChart.prototype.x = function (value) {
        if (arguments.length) {
            this._x = value;
        }
        return this;
    };
    MultiCategoricalChart.prototype.y = function (value) {
        if (arguments.length) {
            this._y = value;
        }
        return this;
    };
    MultiCategoricalChart.prototype.yFormat = function (value) {
        if (arguments.length) {
            this._yAxis.format(value);
        }
        return this;
    };
    MultiCategoricalChart.prototype.groupBy = function (value) {
        if (arguments.length) {
            this._groupBy = value;
        }
        return this;
    };
    MultiCategoricalChart.prototype.update = function (data, yDomain) {
        var _this = this;
        this._xAxis.domain(data.map(this._x));
        if (!yDomain) {
            yDomain = d3.extent(data, this._y);
        }
        this._yAxis.domain(yDomain);
        var bandWidth = this._xAxis.bandWidth();
        var secondaryScale = d3$5.scaleBand()
            .domain(data.map(this._groupBy))
            .range([0, bandWidth]);
        var byCategory = d3$2.nest()
            .key(this._x)
            .entries(data);
        var dataBound = this._seriesGroup.selectAll('.category')
            .data(byCategory);
        dataBound
            .exit()
            .remove();
        var enterSelection = dataBound
            .enter()
            .append('g')
            .classed('category', true)
            .attr('transform', function (d, i) { return "translate(" + _this._xAxis.scale(d.key) + "," + 0 + ")"; });
        enterSelection
            .selectAll('rect')
            .data(function (d) { return d.values; })
            .enter()
            .append('rect')
            .attr('y', function (d, i) { return _this._yAxis.scale(_this._y(d)); })
            .attr('width', secondaryScale.bandwidth())
            .attr('height', function (d, i) { return _this._plotHeight - _this._yAxis.scale(_this._y(d)); })
            .attr('transform', function (d, i) { return "translate(" + secondaryScale(_this._groupBy(d)) + "," + 0 + ")"; })
            .style('fill', function (d, i) { return _this._colorScale(i); });
        this._legend.update(secondaryScale.domain());
    };
    return MultiCategoricalChart;
}());

//# sourceMappingURL=MultiCategoricalChart.js.map

//# sourceMappingURL=Charts.js.map

var Slider = (function () {
    function Slider(selector, _width, _height) {
        this._width = _width;
        this._height = _height;
        var margins = {
            top: 10,
            bottom: 0,
            left: 30,
            right: 30
        };
        var svg = d3$6.select(selector)
            .append('svg')
            .attr('width', _width)
            .attr('height', _height);
        var group = svg.append('g')
            .classed('slider', true)
            .attr('transform', "translate(" + margins.left + "," + margins.top + ")");
        var sliderWidth = _width - margins.left - margins.right;
        this._xScale = d3$5.scaleLinear()
            .range([0, sliderWidth]);
        group.append('line')
            .classed('track', true)
            .attr('x1', 0)
            .attr('x2', sliderWidth);
        group.append('line')
            .classed('track-inset', true)
            .attr('x1', 0)
            .attr('x2', sliderWidth);
        this._handle = group.append('circle')
            .classed('handle', true)
            .attr('r', 8);
        this._ticksGroup = group.append('g')
            .classed('ticks', true)
            .attr('transform', function (d, i) { return "translate(" + 0 + "," + (margins.top + 10) + ")"; });
        this._dispatch = d3$3.dispatch('click');
    }
    Slider.prototype.domain = function (value) {
        var _this = this;
        this._xScale.domain(value);
        this._ticksGroup.selectAll('.tick')
            .data(this._xScale.ticks())
            .enter()
            .append('text')
            .classed('tick', true)
            .attr('x', function (d, i) { return _this._xScale(d); })
            .attr('y', 10)
            .text(function (d) { return d; })
            .on('click', function (d, i) {
            _this._handle
                .transition()
                .attr('transform', "translate(" + _this._xScale(d) + ",0)");
            _this._dispatch.call('click', null, d, i);
        });
    };
    Slider.prototype.on = function (event, callback) {
        this._dispatch.on(event, callback);
        return this;
    };
    return Slider;
}());

//# sourceMappingURL=Slider.js.map

//# sourceMappingURL=index.js.map

exports.ChartContainer = ChartContainer;
exports.title = title;
exports.GetContainer = GetContainer;
exports.Slider = Slider;
exports.BottomLinearAxis = BottomLinearAxis;
exports.BottomTimeAxis = BottomTimeAxis;
exports.LeftCategoricalAxis = LeftCategoricalAxis;
exports.LeftLinearAxis = LeftLinearAxis;
exports.TopLinearAxis = TopLinearAxis;
exports.BottomCategoricalAxis = BottomCategoricalAxis;
exports.HorizontalBarChart = HorizontalBarChart;
exports.LinearLinearChart = LinearLinearChart;
exports.CategoricalLinearChart = CategoricalLinearChart;
exports.TimeLinearChart = TimeLinearChart;
exports.MultiCategoricalChart = MultiCategoricalChart;

Object.defineProperty(exports, '__esModule', { value: true });

})));
