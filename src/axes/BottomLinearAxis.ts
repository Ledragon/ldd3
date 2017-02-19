import { Selection } from 'd3-selection';
import { scaleLinear, ScaleLinear } from 'd3-scale';
import { axisBottom, Axis } from 'd3-axis';
import { extent } from 'd3-array';
import { format } from 'd3-format';

export class BottomLinearAxis<T> {
    private _scale: ScaleLinear<number, number>;
    private _group: Selection<any, any, any, any>;
    private _axis: Axis<any>;

    constructor(container: Selection<any, any, any, any>, private _width: number, private _height: number) {
        var xScale = scaleLinear<number>()
            .range([0, this._width]);
        var fmt = format('0');
        var xAxis = axisBottom(xScale)
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