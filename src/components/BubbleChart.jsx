import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

const BubbleChart = ({
  data,
  title = "Bubble Chart",
  xLabel = "x",
  yLabel = "y",
  rLabel = "r",
  padding = 40,
}) => {
  const svgRef = useRef();
  const [containerSize, setContainerSize] = useState({
    width: 600,
    height: 400,
  });

  useEffect(() => {
    // Dynamically update container size
    const updateSize = () => {
      if (svgRef.current && svgRef.current.parentElement) {
        const { width, height } =
          svgRef.current.parentElement.getBoundingClientRect();
        setContainerSize({
          width: Math.max(width, 300), // Minimum width
          height: Math.max(height, 300), // Minimum height
        });
      }
    };

    updateSize(); // Initial size calculation
    window.addEventListener("resize", updateSize);

    return () => window.removeEventListener("resize", updateSize); // Cleanup
  }, []);

  useEffect(() => {
    const { width, height } = containerSize;
    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("preserveAspectRatio", "xMidYMid meet");

    svg.selectAll("*").remove(); // Clear previous content

    const xScale = d3
      .scaleLinear()
      .domain(d3.extent(data, (d) => +d.x))
      .range([padding, width - padding]);

    const yScale = d3
      .scaleLinear()
      .domain(d3.extent(data, (d) => +d.y))
      .range([height - padding, padding]);

    const maxValue = d3.max(data, (d) => +d.r);
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

    // Bubbles
    svg
      .selectAll("circle")
      .data(data)
      .join("circle")
      .attr("cx", (d) => xScale(+d.x))
      .attr("cy", (d) => yScale(+d.y))
      .attr("r", (d) => sizeScale(+d.r))
      .attr("fill", (d) => colorScale(+d.r))
      .attr("opacity", 0.7)
      .append("title")
      .text((d) => `${rLabel}: ${+d.r}`);

    // Title
    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", 20)
      .attr("text-anchor", "middle")
      .attr("font-size", "16px")
      .attr("font-weight", "bold")
      .text(title);

    // X-axis Label
    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", height - 5)
      .attr("text-anchor", "middle")
      .style("font-size", "12px")
      .text(xLabel);

    // Y-axis Label
    svg
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -height / 2)
      .attr("y", 15)
      .attr("text-anchor", "middle")
      .style("font-size", "12px")
      .text(yLabel);
  }, [data, containerSize, title, xLabel, yLabel, rLabel, padding]);

  return <svg ref={svgRef} style={{ width: "100%", height: "100%" }}></svg>;
};

export default BubbleChart;
