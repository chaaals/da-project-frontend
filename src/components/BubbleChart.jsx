import { useEffect, useRef } from "react";
import * as d3 from "d3";

const BubbleChart = ({
  data,
  title = "Bubble Chart",
  xLabel = "x",
  yLabel = "y",
  rLabel = "r",
  width = 600,
  height = 400,
  padding = 40,
}) => {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const xScale = d3
      .scaleLinear()
      .domain(d3.extent(data, (d) => d.x))
      .range([padding, width - padding]);

    const yScale = d3
      .scaleLinear()
      .domain(d3.extent(data, (d) => d.y))
      .range([height - padding, padding]);

    const maxValue = d3.max(data, (d) => d.r);
    const sizeScale = d3
      .scaleSqrt()
      .domain([0, maxValue])
      .range(maxValue > 100 ? [5, 50] : [5, 30]);

    const colorScale = d3
      .scaleSequential(d3.interpolateBlues)
      .domain([0, maxValue]);

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    svg
      .append("g")
      .attr("transform", `translate(0, ${height - padding})`)
      .call(xAxis);

    svg.append("g").attr("transform", `translate(${padding}, 0)`).call(yAxis);

    svg
      .selectAll("circle")
      .data(data)
      .join("circle")
      .attr("cx", (d) => xScale(d.x))
      .attr("cy", (d) => yScale(d.y))
      .attr("r", (d) => sizeScale(d.r))
      .attr("fill", (d) => colorScale(d.r))
      .attr("opacity", 0.7)
      .append("title")
      .text((d) => `${rLabel}: ${d.r}`);

    svg
      .append("text")
      .attr("class", "title")
      .attr("x", width / 2)
      .attr("y", 20)
      .attr("text-anchor", "middle")
      .attr("font-size", "16px")
      .attr("font-weight", "bold")
      .text(title);

    svg
      .append("text")
      .attr("class", "x-label")
      .attr("x", width / 2)
      .attr("y", height - 5)
      .attr("text-anchor", "middle")
      .style("font-size", "12px")
      .text(xLabel);

    svg
      .append("g")
      .attr("class", "y-axis")
      .attr("transform", `translate(40, 0)`)
      .call(d3.axisLeft(yScale));

    svg
      .append("text")
      .attr("class", "y-label")
      .attr("transform", "rotate(-90)")
      .attr("x", -height / 2)
      .attr("y", 8)
      .attr("text-anchor", "middle")
      .style("font-size", "12px")
      .text(yLabel);
  }, [data, width, xLabel, yLabel, rLabel, title, height, padding]);

  return <svg ref={svgRef} width={width} height={height} />;
};

export default BubbleChart;
