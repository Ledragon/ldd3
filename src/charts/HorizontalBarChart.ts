import * as d3 from 'd3';

import { title } from '../title';
import * as plot from '../plotFactory';
import { LeftCategoricalAxis } from '../LeftCategoricalAxis';

export class HorizontalBarChart<T>{
    private _x: (d: T) => number;
    private _y: (d: T) => string;
    private _xScale: d3.ScaleLinear<number, number>;
    private _yAxis: LeftCategoricalAxis<T>;
    private _title: title;
    private _seriesGroup: d3.Selection<SVGElement, T, any, any>;
    private _color: (d: T) => string;

    constructor(containerId: string, private _width: number, private _height: number) {
        let plotMargins = {
            top: 60,
            bottom: 30,
            left: 120,
            right: 30
        };

        let p = plot.plot('#chart', this._width, this._height, plotMargins);
        let plotGroup = p.group();
        let plotHeight = p.height();
        let plotWidth = p.width();

        this._title = new title(d3.select('#chart').select('svg'), this._width, this._height);

        this._yAxis = new LeftCategoricalAxis(plotGroup, plotWidth, plotHeight)
            .padding(0.5);
        this._xScale = d3.scaleLinear<number, number>()
            .range([0, plotWidth]);

        this._seriesGroup = plotGroup.append('g')
            .classed('series-group', true) as d3.Selection<SVGElement, T, any, any>;
        this._color = () => 'lightgray';
    }


    x(value: (d: T) => number): HorizontalBarChart<T> {
        this._x = value;
        return this;
    }

    y(value: (d: T) => string): HorizontalBarChart<T> {
        this._y = value;
        return this;
    }

    padding(value: number): HorizontalBarChart<T> {
        this._yAxis.padding(value);
        return this;
    }

    title(value: string): HorizontalBarChart<T> {
        this._title.text(value);
        return this;
    }

    color(value: (d: T) => string): HorizontalBarChart<T> {
        this._color = value;
        return this;
    }

    update(data: Array<T>): void {
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
            .classed('series', true)
            .attr('transform', (d, i) => `translate(${0},${this._yAxis.scale(this._y(d))})`);

        var rect = enterSelection.append('rect')
            .attr('x', 0)
            .attr('y', 0)
            .attr('width', d => this._xScale(this._x(d)))
            .attr('height', this._yAxis.bandWidth())
            .style('stroke', 'none')
            .style('fill', d => this._color(d));
        enterSelection.append('text')
            .style('text-anchor', 'end')
            .style('font-size', '10px')
            .attr('x', d => this._xScale(this._x(d)) - 5)
            .attr('y', 11)
            .text(d => this._x(d));
    }
}