import * as d3 from './d3-bundle';

import { IMargins } from './IMargins';
import { ChartContainer } from './ChartContainer';

export function GetContainer(selector: string | d3.BaseType, width: number, height: number, margins: IMargins) {
    let svg = d3.select(selector as any)
        .append('svg')
        .attr('width', width)
        .attr('height', height);
    return new ChartContainer(svg, width, height, margins);
}