# 0.3.0
* BREAKING CHANGES
  * HorizontalBarChart constructor requires a CSS selector (i.e. `#chart`) instead of an id previously
  * LinearLinearChart constructor requires a CSS selector (i.e. `#chart`) instead of an id previously
* All constructors now accept d3 selectable element
* All charts now derive from a base class for more concision and consistency


# 0.2.0
* LinearLinear improvements:
  * hasLine
  * hasPoints
  * pointsColor
  * xFormat
  * yFormat
* MultiCategoricalChart improvements:
  * yFormat
  * colorScale
  * possibility to provide yDomain

# 0.1.8
* Css removed (seemed to make problem)

# 0.1.5
* New constructor for CategoricalLinearChart
* Css distributed
* Minified version available

# 0.1.4
* New css style sheet
* Changed bar labels layout

# 0.1.3
* Set format for horizontal bar chart

# 0.1.2
* Fix update of horizontal bar chart
* Update test
* Added slider

# 0.1.1
* Compile in ES5

# 0.1.0
* Moved Axes to a sub-folder
* Rollup global build (UMD)
* Removed warning about modules only (obsolete)

# 0.0.13
* Fix color scale in MultiCategoricalChart

# 0.0.12
* Added MultiCategoricalChart

# 0.0.11
* Export TimeLinearChart from charts

# 0.0.10
* Added BottomTimeAxis
* Added TimeLinearChart

# 0.0.9
* Update d3 to v4.5.0

# 0.0.8
* Fix yet again

# 0.0.7
* Fix again

# 0.0.6
* Updated readme.md
* Fix for labels when bar is small

# 0.0.5
* Changelog.md
* New CategoricalLinearChart class
* New Legend class