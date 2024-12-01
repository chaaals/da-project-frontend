import { useEffect } from "react";
import * as d3 from "d3";

const ScatterPlot = ({ visId, data, options = {} }) => {
  const selector = `scatter-${visId}`;

  useEffect(() => {
    const {
      width = 600,
      height = 400,
      margin = { top: 20, right: 20, bottom: 30, left: 40 },
    } = options;

    const svg = d3
      .select(`#${selector}`)
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    const x = d3
      .scaleLinear()
      .domain(d3.extent(data, (d) => d.x))
      .nice()
      .range([margin.left, width - margin.right]);
    const y = d3
      .scaleLinear()
      .domain(d3.extent(data, (d) => d.y))
      .nice()
      .range([height - margin.bottom, margin.top]);

    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x));
    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));

    svg
      .append("g")
      .selectAll("circle")
      .data(data)
      .join("circle")
      .attr("cx", (d) => x(d.x))
      .attr("cy", (d) => y(d.y))
      .attr("r", 5)
      .attr("fill", "steelblue");
  }, [data, options, selector]);

  return <div id={selector}></div>;
};

export default ScatterPlot;
