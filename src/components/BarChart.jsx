import React, { useEffect, useRef, useState } from "react";
import { axisBottom, scaleBand, scaleLinear, select } from "d3";
import FileUploadButton from "./Modal/FileUpload";


function AxisBottom({ scale, transform, height }) {
  
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      const xAxis = axisBottom(scale).tickSize(0).tickPadding(10);

      select(ref.current)
        .call(xAxis)
        .selectAll("text")
        .attr("font-size", "18px")
        .attr("fill", "gray")
        .attr("dy", "0em");

      select(ref.current)
        .selectAll(".domain, .tick line")
        .style("display", "none");
    }
  }, [scale, height]);

  return <g ref={ref} transform={transform} />;
}

function Bars({ data, height, scaleX, scaleY, barWidth }) {
  return (
    <>
      {data.map(({ value, label }) => (
        <rect
          key={`bar-${label}`}
          x={scaleX(label)}
          y={scaleY(value)}
          width={scaleX.bandwidth()}
          height={height - scaleY(value)}
          fill="#16A34A"
          rx={4}
        />
      ))}
    </>
  );
}

function BarChart({ initialData, width, height }) {
  const [modalOpen, setModalOpen] = useState(false);
  const margin = { top: 10, right: 0, bottom: 20, left: 0 };
  const [data, setData] = useState(initialData);

  const scaleX = scaleBand()
    .domain(data.map(({ label }) => label))
    .range([0, width])
    .padding(0.8);

  const scaleY = scaleLinear()
    .domain([0, Math.max(...data.map(({ value }) => value))])
    .range([height, 0]);

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  return (
    <div height={height} width={width} className="rounded-md bg-white">
      <div className="flex justify-between border-b-2 border-gray-100  p-3">
        <h1 className="p-3 text-lg font-bold ">Invoices Owed to You</h1>
        <FileUploadButton/>
      </div>

      <svg
        width={width + margin.left + margin.right}
        height={height + margin.top + margin.bottom}
      >
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          <AxisBottom scale={scaleX} transform={`translate(0, ${height})`} height={height} />
          <Bars data={data} height={height - margin.top - margin.bottom} scaleX={scaleX} scaleY={scaleY} />
        </g>
      </svg>
    </div>
  );
}

export default BarChart;
