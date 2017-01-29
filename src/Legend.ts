import * as d3 from 'd3';

export class Legend<T> {
    private _legendWidth = 90;
    private _itemHeight = 20;
    private _legend: d3.Selection<any, any, any, any>;
    private _label: (d: T, i: number) => string;
    private _color: (d: T, i: number) => string;
    constructor(container: d3.Selection<any, any, any, any>, private _width: number, private _height: number) {
        var legendWidth = 90;
        this._legend = container.append('g')
            .classed('legend', true)
            .attr('transform', (d, i) => `translate(${-legendWidth},${0})`);
        this._legend.append('rect')
            .classed('legend-rect', true)
            .style('fill', 'none')
            .style('stroke', 'lightgray');
    }

    label(value: (d: T) => string): Legend<T> {
        if (arguments.length) {
            this._label = value;
        }
        return this;
    }

    color(value: (d: T, i: number) => string): Legend<T> {
        if (arguments.length) {
            this._color = value;
        }
        return this;
    }

    update(data: Array<T>): void {
        let legendBound = this._legend.selectAll('.legend-item')
            .data(d => data);
        legendBound.exit().remove();
        let enterLegend = legendBound
            .enter()
            .append('g')
            .classed('legend-item', true)
            .attr('transform', (d, i) => `translate(${10},${i*20+10})`);
        enterLegend.append('rect')
            .attr('width', 10)
            .attr('height', 10)
            .style('fill', (d, i) => this._color(d, i));
        enterLegend.append('text')
            .attr('x', 15)
            .attr('y', 9)
            .text((d, i) => this._label(d, i));
        var legendHeight = data.length * this._itemHeight+10;
        this._legend
            .attr('transform', (d, i) => `translate(${-this._legendWidth},${-legendHeight})`);
        this._legend.select('rect.legend-rect')
            .attr('width', this._legendWidth-10)
            .attr('height', legendHeight);
    }
}