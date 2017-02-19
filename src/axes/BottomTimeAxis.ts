import * as d3 from 'd3';

export class BottomTimeAxis<T> {
    private _scale: d3.ScaleTime<number, number>;
    private _group: d3.Selection<any, any, any, any>;
    private _axis: d3.Axis<any>;

    constructor(container: d3.Selection<any, any, any, any>, private _width: number, private _height: number) {
        var xScale = d3.scaleTime<number>()
            .range([0, this._width]);
        var xAxis = d3.axisBottom(xScale);
        var xAxisGroup = container.append('g')
            .classed('horizontal axis', true)
            .attr('transform', `translate(${0},${this._height})`);

        this._scale = xScale;
        this._group = xAxisGroup;
        this._axis = xAxis;
    }

    format(value: string): BottomTimeAxis<T>{
        this._axis.tickFormat(d3.timeFormat(value));
        return this;
    }

    domain(value: [Date, Date]): BottomTimeAxis<T> {
        this._scale.domain(value);
        this._group.call(this._axis);
        return this;
    }

    scale(value: Date): number {
        return this._scale(value);
    }
}