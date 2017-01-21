import * as d3 from 'd3';
import { IMargins } from './IMargins';
export class chartContainer {
    private _chartContainerWidth: number;
    private _chartContainerHeight: number;
    private _group: d3.Selection<SVGElement, any, any, any>;
    private _parent: d3.Selection<SVGElement, any, any, any>;
    constructor(container: d3.Selection<any, any, any, any>, width: number, height: number, margins: IMargins) {
        this._parent = container;
        let chartContainerMargins = margins;
        let chartContainerGroup = container.append('g')
            // .classed('chartContainer', true)
            .attr('transform', `translate(${chartContainerMargins.left},${chartContainerMargins.top})`);

        let chartContainerWidth = width - chartContainerMargins.left - chartContainerMargins.right;
        let chartContainerHeight = height - chartContainerMargins.top - chartContainerMargins.bottom;
        this._chartContainerWidth = chartContainerWidth;
        this._chartContainerHeight = chartContainerHeight;
        this._group = chartContainerGroup;
    }
    parent() {
        return this._parent;
    }
    group() {
        return this._group;
    }

    width() {
        return this._chartContainerWidth;
    }

    height() {
        return this._chartContainerHeight;
    }
}