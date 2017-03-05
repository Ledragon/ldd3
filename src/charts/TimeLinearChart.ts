import * as d3 from '../d3-bundle';
import { BottomTimeAxis } from '../Axes';
import { LeftLinearAxis } from '../Axes';

export class TimeLinearChart<T>{
    private _group: d3.Selection<any, any, any, any>;
    private _lineGenerator: d3.Line<any>;
    private _x: (d: T, i: number) => Date;
    private _y: (d: T, i: number) => number;
    private _timeAxis: BottomTimeAxis<T>;
    private _leftAxis: LeftLinearAxis<T>;
    private _path: any;

    constructor(selector: string, width: number, height: number) {
        let svg = d3.select(selector)
            .append('svg')
            .attr('width', width)
            .attr('height', height);
        this._group = svg;

        let plotMargins = {
            top: 60,
            bottom: 30,
            left: 60,
            right: 30
        };
        svg.append('g')
            .classed('title', true)
            .attr('transform', (d, i) => `translate(${width / 2},${30})`)
            .append('text');

        //TODO avoid nasty casting        
        let plotGroup: d3.Selection<SVGGElement, any, any, any> = svg.append('g')
            .classed('plot', true)
            .attr('transform', `translate(${plotMargins.left},${plotMargins.top})`) as d3.Selection<SVGGElement, any, any, any>;

        let plotWidth = width - plotMargins.left - plotMargins.right;
        let plotHeight = height - plotMargins.top - plotMargins.bottom;

        this._timeAxis = new BottomTimeAxis<T>(plotGroup, plotWidth, plotHeight)
        this._leftAxis = new LeftLinearAxis<T>(plotGroup, plotWidth, plotHeight);
        this._lineGenerator = d3.line<T>();

        var group = plotGroup.append('g');
        this._path = group.append('path')
            .style('fill', 'none')
            .style('stroke', 'lightgray');
    }

    color(value: string): TimeLinearChart<T> {
        this._path.style('stroke', value);
        return this;
    }

    x(value: (d: T, i: number) => Date): TimeLinearChart<T> {
        if (arguments.length) {
            this._x = value;
            this._lineGenerator.x((d, i) => this._timeAxis.scale(this._x(d, i)))
        }
        return this;
    }

    y(value: (d: T, i: number) => number): TimeLinearChart<T> {
        if (arguments.length) {
            this._y = value;
            this._lineGenerator.y((d, i) => this._leftAxis.scale(this._y(d, i)))
        }
        return this;
    }

    xFormat(value: string): TimeLinearChart<T> {
        this._timeAxis.format(value);
        return this;
    }

    yFormat(value: string): TimeLinearChart<T> {
        this._leftAxis.format(value);
        return this;
    }

    title(value: string): TimeLinearChart<T> {
        this._group.select('.title')
            .select('text')
            .text(value);
        return this;
    }

    update(data: Array<T>): void {
        this._timeAxis.domain(d3.extent(data, (d, i) => this._x(d, i)) as [Date, Date]);
        this._leftAxis.domain([0, d3.max(data, (d, i) => this._y(d, i))]);
        this._path.attr('d', this._lineGenerator(data));
    }
}