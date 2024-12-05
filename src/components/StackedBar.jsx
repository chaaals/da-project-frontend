import { useEffect, useRef } from "react";
import * as d3 from "d3";

const StackedBarChart = ({
  data,
  keys,
  title = "Stacked Bar Chart",
  width = 600,
  height = 400,
}) => {
  const chartRef = useRef();

  useEffect(() => {
    if (!data || !keys) return;

    const container = d3.select(chartRef.current);
    container.selectAll("*").remove();

    const margin = { top: 60, right: 30, bottom: 40, left: 50 };

    const svg = container
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const colorScale = d3.scaleOrdinal(d3.schemeCategory10).domain(keys);

    const xScale = d3
      .scaleBand()
      .domain(data.map((d) => d.category))
      .range([0, width])
      .padding(0.2);

    const yMax = d3.max(data, (d) =>
      keys.reduce((sum, key) => sum + (Number(d[key]) || 0), 0)
    );

    const yScale = d3.scaleLinear().domain([0, yMax]).nice().range([height, 0]);

    console.log({ yMax });

    const stackedData = d3.stack().keys(keys)(data);

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

    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(xScale));

    svg.append("g").call(d3.axisLeft(yScale));

    const legend = svg
      .append("g")
      .attr("class", "legend")
      .attr("transform", `translate(0, -40)`);

    keys.forEach((key, i) => {
      const legendItem = legend
        .append("g")
        .attr("transform", `translate(${i * 120}, 0)`);

      legendItem
        .append("rect")
        .attr("width", 20)
        .attr("height", 20)
        .attr("fill", colorScale(key));

      legendItem
        .append("text")
        .attr("x", 30)
        .attr("y", 15)
        .text(key.replace(/\b\w/g, (char) => char.toUpperCase()))
        .style("font-size", "12px")
        .attr("alignment-baseline", "middle");
    });

    container
      .select("svg")
      .append("text")
      .attr("class", "title")
      .attr("x", (width + margin.left + margin.right) / 2)
      .attr("y", margin.top / 2)
      .attr("text-anchor", "middle")
      .attr("font-size", "20px")
      .attr("font-weight", "bold")
      .text(title);
  }, [data, keys, width, height, title]);

  return <section ref={chartRef}></section>;
};

export default StackedBarChart;
