import * as d3 from 'd3';

import { title } from '../title';
import { plot } from '../plotFactory';
import { BottomLinearAxis } from '../BottomLinearAxis';
import { LeftLinearAxis } from '../LeftLinearAxis';


export class LinearLinearChart<T> {
    private _xAxis: BottomLinearAxis<any>;
    private _yAxis: LeftLinearAxis<any>;

    private _pathGenerator: d3.Line<any>;
    private _pathGroup: d3.Selection<any, any, any, any>;

    private _x: (d: T) => number;
    private _y: (d: T) => number;
    private _title: title;

    constructor(containerId: string, private _width: number, private _height: number) {
        let margins = {
            top: 60,
            bottom: 30,
            left: 60,
            right: 30
        };
        var p = plot('#' + containerId, this._width, this._height, margins);
        let group = p.group();
        var container = group.append('g')
            .classed('chart-container', true);
        let plotWidth = p.width();
        let plotHeight = p.height();
        this._xAxis = new BottomLinearAxis<T>(container, plotWidth, plotHeight);
        this._yAxis = new LeftLinearAxis<T>(<any>container, plotWidth, plotHeight)
            .format('s');
        this.initPathGenerator(container);
        this._title = new title(p.parent(), this._width, this._height);

        this._x = (d: any) => d.x;
        this._y = (d: any) => d.y;
    }

    x(value: (d: T) => number): LinearLinearChart<T> {
        this._x = value;
        return this;
    }

    y(value: (d: T) => number): LinearLinearChart<T> {
        this._y = value;
        return this;
    }

    title(value: string): LinearLinearChart<T> {
        this._title.text(value);
        return this;
    }

    update(data: Array<T>): void;
    update(data: Array<T>, xDomain: [number, number], yDomain: [number, number]): void;
    update(data: Array<T>, xDomain?: [number, number], yDomain?: [number, number]): void {
        if (!xDomain) {
            xDomain = d3.extent(data, d => this._x(d));
        }
        if (!yDomain) {
            yDomain = d3.extent(data, d => this._y(d));
        }
        this._xAxis.domain(xDomain);
        this._yAxis.domain(yDomain);
        this._pathGroup
            .attr('d', this._pathGenerator(data));
    }

    private initPathGenerator(container: d3.Selection<any, any, any, any>) {
        this._pathGenerator = d3.line<T>()
            .x(d => this._xAxis.scale(this._x(d)))
            .y(d => this._yAxis.scale(this._y(d)))
        this._pathGroup = container.append('g')
            .append('path')
            .classed('trace', true);
    }

}
