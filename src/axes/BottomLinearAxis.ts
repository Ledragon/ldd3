import * as d3 from '../d3-bundle';

export class BottomLinearAxis<T> {
    private _scale: d3.ScaleLinear<number, number>;
    private _group: d3.Selection<any, any, any, any>;
    private _axis: d3.Axis<any>;

    constructor(container: d3.Selection<any, any, any, any>, private _width: number, private _height: number) {
        var xScale = d3.scaleLinear<number>()
            .range([0, this._width]);
        var fmt = d3.format('0');
        var xAxis = d3.axisBottom(xScale)
            .tickFormat((d: any) => fmt(d));
        var xAxisGroup = container.append('g')
            .classed('horizontal axis', true)
            .attr('transform', `translate(${0},${this._height})`);

        this._scale = xScale;
        this._group = xAxisGroup;
        this._axis = xAxis;
    }

    domain(value: [number, number]): BottomLinearAxis<T> {
        this._scale.domain(value);
        this._group.call(this._axis);
        return this;
    }

    scale(value: number): number {
        return this._scale(value);
    }
}