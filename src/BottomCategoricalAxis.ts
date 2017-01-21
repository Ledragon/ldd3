import * as d3 from 'd3';

export class BottomCategoricalAxis<T> {
    private _axis: d3.Axis<T>;
    private _scale: d3.ScaleBand<any>;
    private _group: d3.Selection<SVGGElement, any, any, any>;

    constructor(container: d3.Selection<SVGElement, T, any, any>, private _width: number, private _height: number) {
        this._group = container.append<SVGGElement>('g')
            .classed('axis', true)
            .attr('transform', `translate(${0},${_height})`);
        this._scale = d3.scaleBand<any>()
            .range([0, _width]);
        this._axis = d3.axisBottom(this._scale);
    }

    group(): d3.Selection<SVGGElement, any, any, any> {
        return this._group;
    }

    domain(value?: any): BottomCategoricalAxis<T> | any[] {
        if (arguments.length) {
            this._scale.domain(value);
            this._group.call(this._axis);
            return this;
        }
        else {
            return this._scale.domain();
        }
    }

    padding(value: number): BottomCategoricalAxis<T> {
        this._scale.padding(value);
        return this;
    }

    scale(value: any): number{
        return this._scale(value);
    }

    bandWidth(): number{
        return this._scale.bandwidth();
    }
}