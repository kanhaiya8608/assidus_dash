import React, { useEffect, useMemo, useRef } from "react";
import { axisBottom } from "d3-axis";
import * as d3 from "d3";

const MARGIN = { top: 10, right: 0, bottom: 30, left: 0 };

// Legend component
const Legend = ({ colors, labels }) => (
  <div className="flex gap-4">
    {colors.map((color, i) => (
      <div className="flex items-center" key={i}>
        <svg className="w-5 h-5 mr-2 rounded">
          <rect className="w-full h-full" fill={color} />
        </svg>
        <p>{labels[i]}</p>
      </div>
    ))}
  </div>
);

const StackedBarplot = ({ width, height, data }) => {
  const axesRef = useRef(null);
  const boundsWidth = width - MARGIN.right - MARGIN.left;
  const boundsHeight = height - MARGIN.top - MARGIN.bottom;

  const allGroups = data.map((d) => String(d.x));
  const allSubgroups = Object.keys(data[0]).slice(1); // Extract subgroups from data

  const stackSeries = d3.stack().keys(allSubgroups).order(d3.stackOrderNone);
  const series = stackSeries(data);

  const max = d3.max(series.flat(), (d) => d[1]);
  const yScale = useMemo(() => d3.scaleLinear().domain([0, max || 0]).range([boundsHeight, 0]), [data, height]);

  const xScale = useMemo(() => d3.scaleBand().domain(allGroups).range([0, boundsWidth]).padding(0.75), [data, width]);

  const colorScale = d3.scaleOrdinal().domain(allSubgroups).range(["#16A34A", "#BBF7D0"]);

  useEffect(() => {
    const svgElement = d3.select(axesRef.current);
    svgElement.selectAll("*").remove();
    const xAxisGenerator = axisBottom(xScale);
    const xAxis = xAxisGenerator.tickSize(0).tickPadding(10);
    svgElement
      .append("g")
      .attr("transform", `translate(0, ${boundsHeight})`)
      .call(xAxis)
      .attr("dy", "0em") // Adjust vertical position of the x-axis
      .selectAll("text")
      .attr("font-size", "18px")
      .attr("fill", "gray")
      .style("text-anchor", "middle"); // Center the text on the x-axis

    // hide y-axis
    svgElement.select(".domain").remove();
    svgElement.selectAll(".tick line").remove();

    // show text on x-axis
    svgElement.selectAll(".tick text");
  }, [xScale, yScale, boundsHeight]);

  const rectangles = series.map((subgroup, i) => (
    <g key={i} transform={`translate(${MARGIN.left}, 0)`}>
      {subgroup.map((group, j) => (
        <rect
          key={j}
          x={xScale(group.data.x)}
          y={yScale(group[1])}
          height={yScale(group[0]) - yScale(group[1])}
          width={xScale.bandwidth()}
          fill={colorScale(subgroup.key)}
          opacity={0.9}
          ry={5}
        />
      ))}
    </g>
  ));

  const legendColors = allSubgroups.map((group) => colorScale(group));
  const legendLabels = allSubgroups.map((group) => group.replace("group", "Group "));

  return (
    <div height={height} width={width} className="rounded-md bg-white">
      <div className="flex justify-between border-b-2 border-gray-100 p-3">
        <h1 className="p-3 text-lg font-bold ">Total Cash Flow</h1>
        <Legend colors={legendColors} labels={legendLabels} />
      </div>
      <div className="flex justify-items-center" height={height}>
        <svg width={width} height={height}>
          <g
            width={boundsWidth}
            height={boundsHeight}
            transform={`translate(${[MARGIN.left, MARGIN.top].join(",")})`}
          >
            {rectangles}
          </g>
          <g
            width={boundsWidth}
            height={boundsHeight}
            ref={axesRef}
            transform={`translate(${[MARGIN.left, MARGIN.top].join(",")})`}
          />
        </svg>
      </div>
    </div>
  );
};

export default StackedBarplot;
