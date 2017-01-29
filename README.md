# LDD3

## Description
Yes, it is exactly what you think: another charting library based on [d3](https://d3js.org).

This one was built using [d3](https://d3js.org) v4 and [TypeScript](https://www.typescriptlang.org).

This is currently work in progress (like, really), but I hope some people can find it useful, to see how d3 and typescript can be used, or simply just want to throw some charts on a page without having to deal with the whoe d3 stack.

Being from the .NET world, I used an OOP style for creating the controls and charts, based on `class` syntax.

## Installing

To install ldd3 and get started, simply issue
```
npm install --save ldd3
```

The library is currently only delivered in a module format, meaning you have to use the `import` or `require` syntax to access the controls.

## Library structure
The library currently comprises two types of controls:
* axes
* charts

## Available axes
### BottomCategoricalAxis
```
/**
 * Create a new BottomCategoricalAxis.
 * @param container - the svg element to which the axis will be appended.
 * @param _width - the width of the container.
 * @param _height - the height of the container.
 */
constructor(container: d3.Selection<SVGElement, T, any, any>, _width: number, _height: number);
/**
 * Get the group in which the axis is drawn.
 */
group(): d3.Selection<SVGGElement, any, any, any>;
/**
 * Get or set the domain of the axis.
 */
domain(value?: any): BottomCategoricalAxis<T> | any[];
padding(value: number): BottomCategoricalAxis<T>;
scale(value: any): number;
bandWidth(): number;
```
### BottomLinearAxis
### LeftCategoricalAxis
### LeftLinearAxis
### TopLinearAxis

## Available charts
### LinearLinearChart
### HorizontalBarChart
### CategoricalLinearChart

## Data format
