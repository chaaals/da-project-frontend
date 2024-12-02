import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const StackedBarChart = ({ data, keys, colors, width = 600, height = 400 }) => {
  const chartRef = useRef();

  useEffect(() => {
    if (!data || !keys || !colors) return;

    const container = d3.select(chartRef.current);
    container.selectAll("*").remove(); // Clear existing SVG

    const margin = { top: 60, right: 30, bottom: 40, left: 50 };

    const svg = container
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Create scales
    const xScale = d3
      .scaleBand()
      .domain(data.map((d) => d.category))
      .range([0, width])
      .padding(0.2);

    const yScale = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(data, (d) => keys.reduce((sum, key) => sum + d[key], 0)),
      ])
      .range([height, 0]);

    // Create stacked data
    const stackedData = d3.stack().keys(keys)(data);

    // Create color scale
    const colorScale = d3.scaleOrdinal().domain(keys).range(colors);

    // Draw the bars
    svg
      .selectAll("g.layer")
      .data(stackedData)
      .enter()
      .append("g")
      .attr("class", "layer")
      .attr("fill", (d) => colorScale(d.key))
      .selectAll("rect")
      .data((d) => d)
      .enter()
      .append("rect")
      .attr("x", (d) => xScale(d.data.category))
      .attr("y", (d) => yScale(d[1]))
      .attr("height", (d) => yScale(d[0]) - yScale(d[1]))
      .attr("width", xScale.bandwidth());

    // Add axes
    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(xScale));

    svg.append("g").call(d3.axisLeft(yScale));

    // Add legends
    const legend = svg
      .append("g")
      .attr("class", "legend")
      .attr("transform", `translate(0, -40)`); // Place legends above the chart

    keys.forEach((key, i) => {
      const legendItem = legend
        .append("g")
        .attr("transform", `translate(${i * 120}, 0)`); // Spacing between legend items

      // Add color box
      legendItem
        .append("rect")
        .attr("width", 20)
        .attr("height", 20)
        .attr("fill", colorScale(key));

      // Add text
      legendItem
        .append("text")
        .attr("x", 30)
        .attr("y", 15)
        .text(key.replace(/\b\w/g, (char) => char.toUpperCase())) 
        .style("font-size", "12px")
        .attr("alignment-baseline", "middle");
    });
  }, [data, keys, colors, width, height]);

  return <section ref={chartRef}></section>;
};

export default StackedBarChart;
