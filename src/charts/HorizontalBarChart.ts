import * as d3 from '../d3-bundle';

import { LeftCategoricalAxis } from '../Axes';
import { ChartBase } from './ChartBase';

export class HorizontalBarChart<T> extends ChartBase<T, number, string>{
    private _xScale: d3.ScaleLinear<number, number>;
    private _yAxis: LeftCategoricalAxis<T>;
    private _seriesGroup: d3.Selection<SVGElement, T, any, any>;
    private _color: (d: T) => string;
    private _format: (d: number) => string;

    constructor(selector: string, width: number, height: number);
    constructor(selector: d3.BaseType, width: number, height: number);
    constructor(selector: string | d3.BaseType, width: number, height: number) {
        super(selector, width, height, {
            top: 60,
            bottom: 30,
            left: 120,
            right: 30
        });

        let plotGroup = this.group();
        let plotHeight = this.height();
        let plotWidth = this.width();

        this._yAxis = new LeftCategoricalAxis(plotGroup, plotWidth, plotHeight)
            .padding(0.5);
        this._xScale = d3.scaleLinear<number, number>()
            .range([0, plotWidth]);

        this._seriesGroup = plotGroup.append('g')
            .classed('series-group', true) as d3.Selection<SVGElement, T, any, any>;
        this._color = () => 'lightgray';
    }

    padding(value: number): HorizontalBarChart<T> {
        this._yAxis.padding(value);
        return this;
    }

    color(value: (d: T) => string): HorizontalBarChart<T> {
        this._color = value;
        return this;
    }

    format(value: string): HorizontalBarChart<T> {
        this._format = d3.format(value);
        return this;
    }

    update(data: Array<T>): void {
        let xFunction = this.x();
        let yFunction = this.y();

        this._xScale.domain([0, d3.max(data, xFunction)]);
        this._yAxis.domain(data.map(yFunction));

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
            .style('stroke', 'none')
        enterSelection.append('text')
            .classed('bar-label', true)
            .attr('y', this._yAxis.bandWidth() / 2);
        var merged = enterSelection.merge(dataBound);
        merged.attr('transform', (d, i) => `translate(${0},${this._yAxis.scale(yFunction(d, i))})`)
        merged.select('rect')
            .transition()
            .attr('width', (d, i) => this._xScale(xFunction(d, i)))
            .style('fill', d => this._color(d));
        merged.select('text')
            .transition()
            .attr('x', (d, i) => this._xScale(xFunction(d, i)) + (this._xScale(xFunction(d, i)) < 30 ? 25 : -5))
            .text((d, i) => this._format ? this._format(xFunction(d, i)) : xFunction(d, i));
    }
}