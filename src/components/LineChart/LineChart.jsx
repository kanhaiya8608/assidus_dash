import React, { useEffect, useMemo, useRef } from "react";
import './LineChart.css';
import * as d3 from "d3";
import { useSpring, animated } from "@react-spring/web";

const MARGIN = { top: 30, right: 30, bottom: 50, left: 50 };

const LineChart = ({ width, height, data, selectedGroup }) => {
  const axesRef = useRef(null);
  const boundsWidth = width - MARGIN.right - MARGIN.left;
  const boundsHeight = height - MARGIN.top - MARGIN.bottom;

  // Determine the maximum value in the data for the selectedGroup
  const maxY = useMemo(() => {
    return d3.max(data, (d) => d[selectedGroup]);
  }, [data, selectedGroup]);

  const yScale = useMemo(() => {
    return d3.scaleLinear().domain([0, maxY]).range([boundsHeight, 0]);
  }, [data, height, maxY]);

  const xScale = useMemo(() => {
    return d3.scaleLinear().domain([1, 10]).range([0, boundsWidth]);
  }, [data, width]);

  // Render the X and Y axis using d3.js, not react
  useEffect(() => {
    const svgElement = d3.select(axesRef.current);
    svgElement.selectAll("*").remove();

    const xAxisGenerator = d3.axisBottom(xScale).tickSize(10).tickPadding(10); // Adjust tickSize and tickPadding as needed
    svgElement
      .append("g")
      .attr("transform", `translate(0,${boundsHeight})`)
      .call(xAxisGenerator)
      .selectAll("text")
      .attr("font-size", "18px")
      .attr("fill", "gray");

    // Hide the y-axis
    svgElement.selectAll(".domain").remove();
    svgElement.selectAll(".tick line").remove();

    // Y-axis label
  }, [xScale, yScale, boundsHeight, selectedGroup]);

  const lineBuilder = d3
    .line()
    .x((d) => xScale(d.x))
    .y((d) => yScale(d[selectedGroup]));

  const linePath = lineBuilder(data);

  if (!linePath) {
    return null;
  }

  return (
    <div className="line-chart-container">
      <svg width={width} height={height} className="line-chart">
        {/* first group is lines */}
        <g
          width={boundsWidth}
          height={boundsHeight}
          transform={`translate(${[MARGIN.left, MARGIN.top].join(",")})`}
        >
          <LineItem path={linePath} color={"#69b3a2"} />
        </g>
        {/* Second is for the axes */}
        <g
          width={boundsWidth}
          height={boundsHeight}
          ref={axesRef}
          transform={`translate(${[MARGIN.left, MARGIN.top].join(",")})`}
        />
      </svg>
    </div>
  );
};

const LineItem = ({ path, color }) => {
  const springProps = useSpring({
    to: {
      path,
      color,
    },
    config: {
      friction: 100,
    },
  });

  return (
    <animated.path
      d={springProps.path}
      fill="none"
      stroke={color}
      strokeWidth={3}
    />
  );
};

export default LineChart;
