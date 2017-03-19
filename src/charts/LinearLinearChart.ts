import * as d3 from '../d3-bundle';

// import { title } from '../title';
// import { GetContainer } from '../plotFactory';
import { BottomLinearAxis, LeftLinearAxis } from '../Axes';
import { ChartBase } from './ChartBase';


export class LinearLinearChart<T> extends ChartBase<T, number, number>{
    private _xAxis: BottomLinearAxis<any>;
    private _yAxis: LeftLinearAxis<any>;
    private _hasLine: boolean = true;
    private _hasPoints: boolean = false;
    private _pointColor: (d: T, i: number) => string = () => 'lightgray';
    private _pathGenerator: d3.Line<any>;
    private _pathGroup: d3.Selection<any, any, any, any>;
    private _pointsGroup: d3.Selection<any, any, any, any>;

    // private _x: (d: T) => number;
    // private _y: (d: T) => number;
    // private _title: title;

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
                var container = plotGroup.append('g')
            .classed('chart-container', true);
//     constructor(containerId: string, private _width: number, private _height: number) {
// super()

//         let margins = {
//             top: 60,
//             bottom: 30,
//             left: 60,
//             right: 30
//         };
//         var p = GetContainer('#' + containerId, this._width, this._height, margins);
//         let group = p.group();
//         var container = group.append('g')
//             .classed('chart-container', true);
//         let plotWidth = p.width();
//         let plotHeight = p.height();
        this._xAxis = new BottomLinearAxis<T>(container, plotWidth, plotHeight);
        this._yAxis = new LeftLinearAxis<T>(<any>container, plotWidth, plotHeight)
            .format('s');
        this.initPathGenerator(container);
        this._pointsGroup = container.append('g')
            .classed('points', true);
        // this._title = new title(p.parent(), this._width, this._height);

        // this._x = (d: any) => d.x;
        // this._y = (d: any) => d.y;
    }

    hasLine(value: boolean): LinearLinearChart<T> {
        this._hasLine = value;
        return this;
    }

    hasPoints(value: boolean): LinearLinearChart<T> {
        this._hasPoints = value;
        return this;
    }

    pointColor(value: (d: T, i: number) => string): LinearLinearChart<T> {
        this._pointColor = value;
        return this;
    }

    // x(value: (d: T) => number): LinearLinearChart<T> {
    //     this._x = value;
    //     return this;
    // }

    xFormat(value: string): LinearLinearChart<T> {
        this._xAxis.format(value);
        return this;
    }

    // y(value: (d: T) => number): LinearLinearChart<T> {
    //     this._y = value;
    //     return this;
    // }

    yFormat(value: string): LinearLinearChart<T> {
        this._yAxis.format(value);
        return this;
    }

    // title(value: string): LinearLinearChart<T> {
    //     this._title.text(value);
    //     return this;
    // }

    update(data: Array<T>): void;
    update(data: Array<T>, xDomain: [number, number], yDomain: [number, number]): void;
    update(data: Array<T>, xDomain?: [number, number], yDomain?: [number, number]): void {
        const xFunction = this.x();
        const yFunction = this.y();
        if (!xDomain) {
            xDomain = d3.extent(data, d => xFunction(d));
        }
        if (!yDomain) {
            yDomain = d3.extent(data, d => yFunction(d));
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
            .attr('cx', d => this._xAxis.scale(xFunction(d)))
            .attr('cy', d => this._yAxis.scale(yFunction(d)))
            .style('fill', (d, i) => this._pointColor(d, i));
    }

    private initPathGenerator(container: d3.Selection<any, any, any, any>) {
        this._pathGenerator = d3.line<T>()
            .x(d => this._xAxis.scale(this.x()(d)))
            .y(d => this._yAxis.scale(this.y()(d)))
        this._pathGroup = container.append('g')
            .append('path')
            .classed('trace', true)
            .style('fill', 'none');
    }

}
