import * as d3 from '../d3-bundle';

import { BottomTimeAxis, LeftLinearAxis } from '../Axes';
import { ChartBase } from './ChartBase';

export class TimeLinearChart<T> extends ChartBase<T, Date, number>{
    private _timeAxis: BottomTimeAxis<T>;
    private _leftAxis: LeftLinearAxis<T>;
    private _path: any;

    constructor(selector: string, width: number, height: number);
    constructor(selector: d3.BaseType, width: number, height: number);
    constructor(selector: string | d3.BaseType, width: number, height: number) {
        super(selector, width, height, {
            top: 60,
            bottom: 30,
            left: 60,
            right: 90
        });

        const plotGroup = this.group();
        const plotWidth = this.width();
        const plotHeight = this.height();

        this._timeAxis = new BottomTimeAxis<T>(plotGroup, plotWidth, plotHeight)
        this._leftAxis = new LeftLinearAxis<T>(plotGroup, plotWidth, plotHeight);

        var group = plotGroup.append('g');
        this._path = group.append('path')
            .style('fill', 'none')
            .style('stroke', 'lightgray');
    }

    color(value: string): this {
        this._path.style('stroke', value);
        return this;
    }

    xFormat(value: string): this {
        this._timeAxis.format(value);
        return this;
    }

    yFormat(value: string): this {
        this._leftAxis.format(value);
        return this;
    }

    update(data: Array<T>): void {
        let lineGenerator = d3.line<T>()
            .x((d, i) => this._timeAxis.scale(this.x()(d, i)))
            .y((d, i) => this._leftAxis.scale(this.y()(d, i)));
        this._timeAxis.domain(d3.extent(data, (d, i) => this.x()(d, i)) as [Date, Date]);
        this._leftAxis.domain([0, d3.max(data, (d, i) => this.y()(d, i))]);
        this._path.attr('d', lineGenerator(data));
    }
}