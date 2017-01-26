import * as d3 from 'd3';

/**
 * A class representing a bottom catageorical axis.
 */
export class BottomCategoricalAxis<T> {
    private _axis: d3.Axis<T>;
    private _scale: d3.ScaleBand<any>;
    private _group: d3.Selection<SVGGElement, any, any, any>;

    /**
     * @constructor Create a new BottomCategoricalAxis.
     * @param container - the svg element to which the axis will be appended.
     * @param _width - the width of the container.
     * @param _height - the height of the container.
     */

    constructor(container: d3.Selection<SVGElement, T, any, any>, private _width: number, private _height: number) {
        this._group = container.append<SVGGElement>('g')
            .classed('axis', true)
            .attr('transform', `translate(${0},${_height})`);
        this._scale = d3.scaleBand<any>()
            .range([0, _width]);
        this._axis = d3.axisBottom(this._scale);
    }

    /**
     * Get the group in which the axis is drawn.
     */
    group(): d3.Selection<SVGGElement, any, any, any> {
        return this._group;
    }

    /**
     * Get or set the domain of the axis.
     */
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

    scale(value: any): number {
        return this._scale(value);
    }

    bandWidth(): number {
        return this._scale.bandwidth();
    }
}