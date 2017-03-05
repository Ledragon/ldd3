import * as d3 from './d3-bundle';

export class title {
    private _group: d3.Selection<any, any, any, any>;
    constructor(container: d3.Selection<any, any, any, any>, width: number, height: number) {
        this._group = container.append('g')
            .classed('chart-title', true)
            .attr('transform', `translate(${width / 2},${30})`);

        this._group.append('text');
    }

    text(value: string): void {
        this._group.select('text').text(value);
    }
    
    classed(value: string): void{
        this._group.classed(value, true);
    }
}