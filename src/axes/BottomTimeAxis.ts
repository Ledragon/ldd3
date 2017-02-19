import { Selection } from 'd3-selection';
import { scaleTime, ScaleTime } from 'd3-scale';
import { axisBottom, Axis } from 'd3-axis';
import { extent } from 'd3-array';
// import { format } from 'd3-format';
import { timeFormat } from 'd3-time-format';

export class BottomTimeAxis<T> {
    private _scale: ScaleTime<number, number>;
    private _group: Selection<any, any, any, any>;
    private _axis: Axis<any>;

    constructor(container: Selection<any, any, any, any>, private _width: number, private _height: number) {
        var xScale = scaleTime<number>()
            .range([0, this._width]);
        // var fmt = format('0');
        var xAxis = axisBottom(xScale)
            // .tickFormat((d: any) => fmt(d));
        var xAxisGroup = container.append('g')
            .classed('horizontal axis', true)
            .attr('transform', `translate(${0},${this._height})`);

        this._scale = xScale;
        this._group = xAxisGroup;
        this._axis = xAxis;
    }

    format(value: string): BottomTimeAxis<T>{
        this._axis.tickFormat(timeFormat(value));
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