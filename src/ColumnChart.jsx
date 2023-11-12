import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

const ColumnChart = () => {
  const ref = useRef();
  const [selectedCountry1, setSelectedCountry1] = useState("All");
  const [selectedCountry2, setSelectedCountry2] = useState("All");

  // Function to generate random data for a specific country
  const generateRandomData = (country) => {
    return [
      { Country: country, Value: Math.random() * 10000 },
    ];
  };

  const handleCountryChange1 = (event) => {
    setSelectedCountry1(event.target.value);
  };

  const handleCountryChange2 = (event) => {
    setSelectedCountry2(event.target.value);
  };

  useEffect(() => {
    const margin = { top: 30, right: 30, bottom: 70, left: 60 },
      width = 900 - margin.left - margin.right,
      height = 600 - margin.top - margin.bottom;

    const svg = d3
      .select(ref.current)
      .select("svg")
      .remove(); // Remove previous SVG

    let data;

    if (selectedCountry1 === "All") {
      data = ["A", "B", "C", "D"].map((country) => generateRandomData(country));
    } else {
      data = ["A", "B", "C", "D"].map((country) => generateRandomData(country));
    }

    const newSvg = d3
      .select(ref.current)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3.scaleBand().range([0, width]).domain(["A", "B", "C", "D"]).padding(0.6);

    newSvg
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x).tickSize(0))
      .selectAll("text")
      .style("text-anchor", "end");

    const y = d3.scaleLinear().domain([0, 13000]).range([height, 0]);

    data.forEach((countryData) => {
      newSvg
        .selectAll("mybar")
        .data(countryData)
        .join("rect")
        .attr("x", (d) => x(d.Country))
        .attr("y", (d) => y(d.Value))
        .attr("width", x.bandwidth())
        .attr("height", (d) => height - y(d.Value))
        .attr("fill", "#5f0f40");
    });
  }, [selectedCountry1, selectedCountry2]);

  return (
    <div>
      <select value={selectedCountry1} onChange={handleCountryChange1}>
        <option value="All">All</option>
        <option value="A">A</option>
        <option value="B">B</option>
        <option value="C">C</option>
        <option value="D">D</option>
      </select>
      <select value={selectedCountry2} onChange={handleCountryChange2}>
        <option value="All">All</option>
        <option value="A">A</option>
        <option value="B">B</option>
        <option value="C">C</option>
        <option value="D">D</option>
      </select>
      <div id="columnchart" ref={ref}>
        <svg width={900} height={600} />
      </div>
    </div>
  );
};

export default ColumnChart;
