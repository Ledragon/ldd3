import * as d3 from 'd3';
import { LeftLinearAxis, BottomCategoricalAxis } from '../Axes';
import { GetContainer } from '../plotFactory';
import { Legend } from '../legend';
import { title } from '../title';

export class MultiCategoricalChart<T> {
    private _group: d3.Selection<SVGElement, any, any, any>;
    private _plotHeight: number;
    private _xAxis: BottomCategoricalAxis<T>;
    private _yAxis: LeftLinearAxis<T>;
    private _x: (d: T) => string;
    private _y: (d: T) => number;
    private _groupBy: (d: T) => string;
    private _seriesGroup: d3.Selection<any, any, any, any>;
    private _legend: Legend<string>;
    private _title: title;
    constructor(selector: string, private _width: number, private _height: number) {
        let plotMargins = {
            top: 60,
            bottom: 30,
            left: 90,
            right: 210
        };
        var container = GetContainer(selector, _width, _height, plotMargins);
        this._group = container.group();
        this._xAxis = new BottomCategoricalAxis<T>(this._group, container.width(), container.height())
            .padding(0.3);
        this._yAxis = new LeftLinearAxis<T>(this._group, container.width(), container.height());
        this._x = (d: any) => d.category;
        this._y = (d: any) => d.value;
        this._seriesGroup = this._group.append('g')
            .classed('series', true);
        this._plotHeight = container.height();
        let legendContainer = container.parent()
            .append('g')
            .classed('legend-container', true)
            .attr('transform', `translate(${container.width() + plotMargins.left + plotMargins.right},${container.height() / 2})`);
        this._legend = new Legend<string>(legendContainer, container.width(), container.height())
            .color((d, i) => d3.schemeCategory10[i])
            .label(d => d);
        this._title = new title(container.parent(), _width, _height);
    }

    title(value: string): MultiCategoricalChart<T> {
        this._title.text(value);
        return this;
    }
    x(value: (d: T) => string): MultiCategoricalChart<T> {
        if (arguments.length) {
            this._x = value;
        }
        return this;
    }

    y(value: (d: T) => number): MultiCategoricalChart<T> {
        if (arguments.length) {
            this._y = value;
        }
        return this;
    }

    groupBy(value: (d: T) => string): MultiCategoricalChart<T> {
        if (arguments.length) {
            this._groupBy = value;
        }
        return this;
    }

    update(data: Array<T>): void {
        this._xAxis.domain(data.map(this._x));
        this._yAxis.domain(d3.extent(data, this._y));
        let bandWidth = this._xAxis.bandWidth();
        var secondaryScale = d3.scaleBand<any>()
            .domain(data.map(this._groupBy))
            .range([0, bandWidth]);
        let byCategory = d3.nest<any>()
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
            .attr('transform', (d, i) => `translate(${this._xAxis.scale(d.key)},${0})`);
        enterSelection
            .selectAll('rect')
            .data(d => <Array<T>>d.values)
            .enter()
            .append('rect')
            .attr('y', (d, i) => this._yAxis.scale(this._y(d)))
            .attr('width', secondaryScale.bandwidth())
            .attr('height', (d, i) => this._plotHeight - this._yAxis.scale(this._y(d)))
            .attr('transform', (d: any, i) => `translate(${secondaryScale(this._groupBy(d))},${0})`)
            .style('fill', (d, i) => d3.schemeCategory20[i]);
        this._legend.update(secondaryScale.domain());
    }
}