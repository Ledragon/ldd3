import * as d3 from '../d3-bundle';

import { BottomCategoricalAxis, LeftLinearAxis } from '../Axes';
import { Legend } from '../Legend';
import { ChartBase } from './ChartBase';

/**
 * A categorical-linear chart.
 * ![img](./CategoricalLinearChart.png)
 */
export class CategoricalLinearChart<T> extends ChartBase<T, string, number> {
    private _xAxis: BottomCategoricalAxis<T>;
    private _yAxis: LeftLinearAxis<T>;
    private _lineGenerator: d3.Line<T>;
    private _groupBy: (d: T) => string;
    private _legend: Legend<any>;
    private _color = (d: T, i: number) => d3.schemeCategory10[i];

    constructor(selector: string, width: number, height: number);
    constructor(selector: d3.BaseType, width: number, height: number);
    constructor(selector: string | d3.BaseType, width: number, height: number) {
        super(selector, width, height, {
            top: 60,
            bottom: 30,
            left: 60,
            right: 90
        });

        const plotGroup = this.group();
        const plotWidth = this.width();
        const plotHeight = this.height();

        this._xAxis = new BottomCategoricalAxis(plotGroup, plotWidth, plotHeight);
        this._yAxis = new LeftLinearAxis(plotGroup, plotWidth, plotHeight);
        this._lineGenerator = d3.line<T>()
            .curve(d3.curveStep)
            .x((d, i) => this._xAxis.scale(this.x()(d, i)) + this._xAxis.bandWidth() / 2)
            .y((d, i) => this._yAxis.scale(this.y()(d, i)));

        var legendWidth = 150;
        var legendContainer = this.parent()
            .append('g')
            .attr('transform', (d, i) => `translate(${width},${height / 2})`);
        this._legend = new Legend<any>(legendContainer, width, plotHeight)
            .label(d => d.key)
            .color(this._color);
    }

    color(value: (d: any, i: number) => string): this {
        this._color = value;
        return this;
    }

    groupBy(value: (d: T) => string): this {
        if (arguments.length) {
            this._groupBy = value;
        }
        return this;
    }

    curve(value: string): this {
        if (value === 'step') {
            this._lineGenerator
                .curve(d3.curveStep);
        } else {
            this._lineGenerator
                .curve(d3.curveLinear);
        }

        return this;
    }

    update(data: Array<T>): void {
        this._xAxis.domain(data.map((d, i) => this.x()(d, i)));
        this._yAxis.domain([0, d3.max(data, (d, i) => this.y()(d, i))]);

        let grouped = d3.nest<T>()
            .key(d => this._groupBy(d))
            .entries(data);
        var dataBound = this.group().selectAll('.series')
            .data(grouped);
        dataBound.exit()
            .remove();
        var enterSelection = dataBound
            .enter()
            .append('g')
            .classed('year-series', true);
        enterSelection.append('path')
            .attr('d', (d: any) => this._lineGenerator(d.values))
            .style('stroke', (d: any, i) => this._color(d, i));
        this._legend.update(grouped);
    }
}
