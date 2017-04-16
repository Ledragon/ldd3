import * as d3 from '../d3-bundle';

export class SpiderChart<T> {
    private _radius = 200;
    private _title: d3.Selection<any, any, any, any>;
    private _legend: d3.Selection<any, any, any, any>;
    private _linesContainer: d3.Selection<any, any, any, any>;
    private _seriesContainer: d3.Selection<any, any, any, any>;
    private _x: (d: T, i?: number) => number;
    private _y: (d: T, i?: number) => string;
    private _groupBy: (d: T) => string;

    constructor(selector: string | d3.BaseType, width: number, height: number) {
        const margin = 150;
        this._radius = Math.min(width / 2 - margin, height / 2 - margin);
        const titleHeight = 45;
        const legendWidth = 100;
        const legendHeight = 55;
        var center = this._radius + margin;
        var svg = d3.select(selector as any)
            .append('svg')
            .attr('width', 2 * center + legendWidth + 2 * 10)
            .attr('height', 2 * center + titleHeight);

        svg.append('clipPath')
            .attr('id', 'my-clippath')
            .append('rect')
            .attr('width', 2 * center)
            .attr('height', 2 * center);

        this._title = svg.append('g')
            .classed('title', true)
            .append('text')
            .attr('transform', `translate(${center},${25})`);

        this._legend = svg.append('g')
            .classed('legend', true)
            .attr('transform', (d, i) => `translate(${20},${titleHeight + 20})`);
        this._legend.append('rect')
            .attr('width', legendWidth)
            .attr('height', legendHeight)
            .style('fill', 'none')
            .style('stroke', 'darkgray');

        var container = svg.append('g')
            .classed('container', true)
            .attr('transform', `translate(${0},${titleHeight})`)
            .style('clip-path', 'url(#my-clippath)');
        container.append('circle')
            .attr('cx', center)
            .attr('cy', center)
            .attr('r', this._radius)
            .style('fill', 'none')
            .style('stroke', 'darkgray');
        this._linesContainer = container.append('g')
            .attr('transform', (d, i) => `translate(${center},${center})`);
        this._seriesContainer = container.append('g')
            .attr('transform', (d, i) => `translate(${center},${center})`);
    }

    x(value: (d: T, i?: number) => number): this {
        this._x = value;
        return this;
    }
    y(value: (d: T, i?: number) => string): this {
        this._y = value;
        return this;
    }

    groupBy(value: (d: T) => string): this {
        this._groupBy = value;
        return this;
    }

    update(data: Array<T>) {
        var grouped = d3.nest<T>()
            .key(this._groupBy)
            .entries(data);

        var colorScale = d3.scaleOrdinal<string, string>()
            .domain(grouped.map(d => d.key))
            .range(d3.schemeCategory20);

        var valuesScale = d3.scaleLinear<number, number>()
            .range([0, this._radius])
            .domain([0, d3.max(data, this._x)])
            .nice();
        var keys = d3.nest<T>()
            .key(this._y)
            .entries(data)
            .map(d => d.key);
        var dataBound = this._linesContainer.selectAll('.line')
            .data(keys);
        dataBound
            .exit()
            .remove();
        var enterSelection = dataBound
            .enter()
            .append('g')
            .classed('line', true);
        enterSelection.append('line')
            .attr('x1', 0)
            .attr('y1', 0)
            .attr('x2', (d, i) => Math.cos(i * Math.PI * 2 / keys.length) * this._radius)
            .attr('y2', (d, i) => Math.sin(i * Math.PI * 2 / keys.length) * this._radius)
            .style('stroke', 'lightgray');
        enterSelection.append('text')
            .attr('x', this._radius + 15)
            .style('font-size', '.8em')
            .text((d: string) => d)
            .attr('transform', (d, i) => `rotate(${i * 360 / keys.length})`);


        let generator = d3.line<T>()
            .x((d, i) => {
                var res = Math.cos(i * Math.PI * 2 / keys.length) * valuesScale(this._x(d, i));
                return res;
            })
            .y((d, i) => Math.sin(i * Math.PI * 2 / keys.length) * valuesScale(this._x(d, i)))
            .curve(d3.curveLinearClosed)
            ;
        var seriesBound = this._seriesContainer.selectAll('.series')
            .data(grouped);
        seriesBound
            .exit()
            .remove();
        var enterSeries = seriesBound
            .enter()
            .append('g')
            .classed('series', true);
        enterSeries.append('path')
            .attr('d', d => generator(d.values))
            .style('fill', d => colorScale(d.key))
            .style('opacity', 0.5);
        enterSeries.append('path')
            .attr('d', d => generator(d.values))
            .style('fill', 'none')
            .style('stroke', d => colorScale(d.key));

        let legendEnter = this._legend.selectAll('.legend-item')
            .data(colorScale.domain())
            .enter()
            .append('g')
            .classed('legend-item', true)
            .attr('transform', (d, i) => `translate(${5},${i * 15 + 5})`);
        legendEnter.append('rect')
            .attr('width', 10)
            .attr('height', 10)
            .style('fill', d => colorScale(d));
        legendEnter.append('text')
            .attr('x', 15)
            .attr('y', 10)
            .text(d => d);
    }
}