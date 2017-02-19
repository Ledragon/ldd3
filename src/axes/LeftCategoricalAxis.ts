import * as d3 from 'd3';

export class LeftCategoricalAxis<T> {
    private _axis: d3.Axis<string>;
    private _scale: d3.ScaleBand<string>;
    private _group: d3.Selection<SVGGElement, any, any, any>;

    constructor(container: d3.Selection<SVGElement, T, any, any>, private _width: number, private _height: number) {
        this._group = container.append<SVGGElement>('g')
            .classed('axis', true)
            .attr('transform', `translate(${0},${0})`);
        this._scale = d3.scaleBand<any>()
            .range([0, _height]);
        this._axis = d3.axisLeft(this._scale);
    }

    group(): d3.Selection<SVGGElement, any, any, any> {
        return this._group;
    }

    domain(): string[];
    domain(value: string[]): LeftCategoricalAxis<T>;
    domain(value?: string[]): LeftCategoricalAxis<T> | any[] {
        if (arguments.length) {
            this._scale.domain(value);
            this._group.call(this._axis);
            return this;
        }
        else {
            return this._scale.domain();
        }
    }

    scale(value: any): number {
        return this._scale(value);
    }

    bandWidth(): number {
        return this._scale.bandwidth();
    }

    padding(): number;
    padding(value: number): LeftCategoricalAxis<T>;
    padding(value?: number): any {
        if (arguments.length) {
            this._scale.padding(value);
            return this;
        } else {
            return this._scale.padding();
        }
    }
}