import * as d3 from '../d3-bundle';

import { GetContainer } from '../plotFactory';
import { ChartContainer } from '../ChartContainer';
import { IMargins } from '../IMargins';
import { title } from '../title';

export class ChartBase<TDatum, Tx, Ty>{
    private _group: d3.Selection<any, any, any, any>;
    private _plotWidth: number;
    private _plotHeight: number;
    private _x: (d: TDatum, i: number) => Tx;
    private _y: (d: TDatum, i: number) => Ty;
    private _container: ChartContainer;
    private _title: title;

    constructor(selector: string | d3.BaseType, private _width: number, private _height: number, plotMargins: IMargins) {
        var container = GetContainer(selector, _width, _height, plotMargins);
        this._container = container;
        this._group = container.group();
        this._plotWidth = container.width();
        this._plotHeight = container.height();
        this._title = new title(this.parent(), _width, _height);

    }

    group(): d3.Selection<any, any, any, any> {
        return this._group;
    }

    width(): number {
        return this._plotWidth;
    }

    height(): number {
        return this._plotHeight;
    }

    parent(): d3.Selection<any, any, any, any> {
        return this._container.parent();
    }

    x(): (d: TDatum, i: number) => Tx;
    x(value: (d: TDatum, i: number) => Tx): this;
    x(value?: (d: TDatum, i: number) => Tx): any {
        if (arguments.length) {
            this._x = value;
            return this;
        } else {
            return this._x;
        }
    }

    y(): (d: TDatum, i: number) => Ty;
    y(value: (d: TDatum, i: number) => Ty): this;
    y(value?: (d: TDatum, i: number) => Ty): any {
        if (arguments.length) {
            this._y = value;
            return this;
        }
        else {
            return this._y;
        }
    }


    title(value: string): this {
        this._title.text(value);
        return this;
    }
}