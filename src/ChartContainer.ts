import * as d3 from './d3-bundle';
import { IMargins } from './IMargins';

export class ChartContainer {
    private _chartContainerWidth: number;
    private _chartContainerHeight: number;
    private _group: d3.Selection<SVGElement, any, any, any>;
    private _parent: d3.Selection<SVGElement, any, any, any>;
    constructor(container: d3.Selection<any, any, any, any>, width: number, height: number, margins: IMargins) {
        this._parent = container;
        let chartContainerMargins = margins;
        let chartContainerGroup = container.append('g')
            .attr('transform', `translate(${chartContainerMargins.left},${chartContainerMargins.top})`);

        let chartContainerWidth = width - chartContainerMargins.left - chartContainerMargins.right;
        let chartContainerHeight = height - chartContainerMargins.top - chartContainerMargins.bottom;
        this._chartContainerWidth = chartContainerWidth;
        this._chartContainerHeight = chartContainerHeight;
        this._group = chartContainerGroup as d3.Selection<SVGElement, any, any, any>;
    }

    parent(): d3.Selection<SVGElement, any, any, any> {
        return this._parent;
    }
    group(): d3.Selection<SVGElement, any, any, any> {
        return this._group;
    }

    width(): number {
        return this._chartContainerWidth;
    }

    height(): number {
        return this._chartContainerHeight;
    }
}