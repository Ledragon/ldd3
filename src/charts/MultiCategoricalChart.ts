import * as d3 from '../d3-bundle';

import { LeftLinearAxis, BottomCategoricalAxis } from '../Axes';
import { Legend } from '../Legend';
import { ChartBase } from './ChartBase';

export class MultiCategoricalChart<T> extends ChartBase<T, string, number> {
    private _xAxis: BottomCategoricalAxis<T>;
    private _yAxis: LeftLinearAxis<T>;
    private _groupBy: (d: T) => string;
    private _seriesGroup: d3.Selection<any, any, any, any>;
    private _legend: Legend<string>;
    private _colorScale = (i: number) => d3.schemeCategory20[i];

    constructor(selector: string, width: number, height: number);
    constructor(selector: d3.BaseType, width: number, height: number);
    constructor(selector: string | d3.BaseType, width: number, height: number) {
        super(selector, width, height, {
            top: 60,
            bottom: 30,
            left: 60,
            right: 90
        });
        let plotMargins = {
            top: 60,
            bottom: 30,
            left: 60,
            right: 90
        };

        const plotGroup = this.group();
        const plotWidth = this.width();
        const plotHeight = this.height();
        
        this._xAxis = new BottomCategoricalAxis<T>(plotGroup, plotWidth, plotHeight)
            .padding(0.3);
        this._yAxis = new LeftLinearAxis<T>(plotGroup, plotWidth, plotHeight);
        
        this._seriesGroup = plotGroup.append('g')
            .classed('series', true);
        
        let legendContainer = this.parent()
            .append('g')
            .classed('legend-container', true)
            .attr('transform', `translate(${plotWidth + plotMargins.left + plotMargins.right},${plotHeight / 2})`);
        this._legend = new Legend<string>(legendContainer, plotWidth, plotHeight)
            .color((d, i) => this._colorScale(i))
            .label(d => d);
    }

    color(value: (i: number) => string): this {
        if (value) {
            this._colorScale = value;
        }
        return this;
    }

    yFormat(value: string): this {
        if (arguments.length) {
            this._yAxis.format(value);
        }
        return this;
    }

    groupBy(value: (d: T) => string): this {
        if (arguments.length) {
            this._groupBy = value;
        }
        return this;
    }

    update(data: Array<T>): void;
    update(data: Array<T>, yDomain: [number, number]): void;
    update(data: Array<T>, yDomain?: [number, number]): void {
        this._xAxis.domain(data.map(this.x()));
        if (!yDomain) {
            yDomain = d3.extent(data, this.y());
        }
        this._yAxis.domain(yDomain);
        let bandWidth = this._xAxis.bandWidth();
        var secondaryScale = d3.scaleBand<any>()
            .domain(data.map(this._groupBy))
            .range([0, bandWidth]);
        let byCategory = d3.nest<any>()
            .key(this.x())
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
            .attr('transform', (d, i) => `translate(${this._xAxis.scale(d.key)},${0})`);
        enterSelection
            .selectAll('rect')
            .data(d => <Array<T>>d.values)
            .enter()
            .append('rect')
            .attr('y', (d, i) => this._yAxis.scale(this.y()(d)))
            .attr('width', secondaryScale.bandwidth())
            .attr('height', (d, i) => this.height() - this._yAxis.scale(this.y()(d)))
            .attr('transform', (d: any, i) => `translate(${secondaryScale(this._groupBy(d))},${0})`)
            .style('fill', (d, i) => this._colorScale(i));
        this._legend.update(secondaryScale.domain());
    }
}