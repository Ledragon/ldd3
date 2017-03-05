import * as d3 from './d3-bundle';

export class Slider {
    private _xScale: d3.ScaleLinear<number, number>;
    private _ticksGroup: d3.Selection<any, any, any, any>;
    private _handle: d3.Selection<any, any, any, any>;
    private _dispatch: any;
    constructor(selector: string, private _width: number, private _height: number) {
        var margins = {
            top: 10,
            bottom: 0,
            left: 30,
            right: 30
        }
        var svg = d3.select(selector)
            .append('svg')
            .attr('width', _width)
            .attr('height', _height);
        var group = svg.append('g')
            .classed('slider', true)
            .attr('transform', `translate(${margins.left},${margins.top})`);
        let sliderWidth = _width - margins.left - margins.right;
        this._xScale = d3.scaleLinear<number, number>()
            .range([0, sliderWidth]);
        group.append('line')
            .classed('track', true)
            .attr('x1', 0)
            .attr('x2', sliderWidth);
        group.append('line')
            .classed('track-inset', true)
            .attr('x1', 0)
            .attr('x2', sliderWidth);
        this._handle = group.append('circle')
            .classed('handle', true)
            .attr('r', 8);
        this._ticksGroup = group.append('g')
            .classed('ticks', true)
            .attr('transform', (d, i) => `translate(${0},${margins.top + 10})`);
        this._dispatch = d3.dispatch('click');
    }

    domain(value: [number, number]) {
        this._xScale.domain(value);
        this._ticksGroup.selectAll('.tick')
            .data(this._xScale.ticks())
            .enter()
            .append('text')
            .classed('tick', true)
            .attr('x', (d, i) => this._xScale(d))
            .attr('y', 10)
            .text(d => d)
            .on('click', (d, i) => {
                this._handle
                    .transition()
                    .attr('transform', `translate(${this._xScale(d)},0)`);
                this._dispatch.call('click', null, d, i);
            });
    }

    on(event: string, callback: (d: number, i:number) => void): Slider{
        this._dispatch.on(event, callback);
        return this;
    }
}