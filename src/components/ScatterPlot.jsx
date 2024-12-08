import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

const ScatterPlot = ({
  data,
  title = "Scatter Plot",
  xLabel = "x",
  yLabel = "y",
  margin = { top: 40, right: 40, bottom: 60, left: 60 },
}) => {
  const ref = useRef();
  const [dimensions, setDimensions] = useState({ width: 500, height: 400 });

  useEffect(() => {
    const handleResize = () => {
      if (ref.current) {
        const parentWidth = ref.current.parentElement.offsetWidth;
        const parentHeight = ref.current.parentElement.offsetHeight || 400;
        setDimensions({ width: parentWidth, height: parentHeight });
      }
    };

    handleResize(); // Initial size
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const { width, height } = dimensions;

    const svg = d3
      .select(ref.current)
      .attr("width", width)
      .attr("height", height);

    // Clear previous content
    svg.selectAll("*").remove();

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const xScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => +d.x)])
      .range([0, innerWidth]);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => +d.y)])
      .range([innerHeight, 0]);

    const chart = svg
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Draw circles
    chart
      .selectAll("circle")
      .data(data)
      .join("circle")
      .attr("cx", (d) => xScale(+d.x))
      .attr("cy", (d) => yScale(+d.y))
      .attr("r", 5)
      .attr("fill", "teal");

    // X Axis
    chart
      .append("g")
      .attr("transform", `translate(0, ${innerHeight})`)
      .call(d3.axisBottom(xScale));

    chart
      .append("text")
      .attr("class", "x-label")
      .attr("x", innerWidth / 2)
      .attr("y", innerHeight + margin.bottom - 20) // Adjusted for clipping
      .attr("text-anchor", "middle")
      .style("font-size", "12px")
      .text(xLabel);

    // Y Axis
    chart.append("g").call(d3.axisLeft(yScale));

    chart
      .append("text")
      .attr("class", "y-label")
      .attr("transform", "rotate(-90)")
      .attr("x", -innerHeight / 2)
      .attr("y", -margin.left + 15)
      .attr("text-anchor", "middle")
      .style("font-size", "12px")
      .text(yLabel);

    // Title
    svg
      .append("text")
      .attr("class", "title")
      .attr("x", width / 2)
      .attr("y", margin.top / 2)
      .attr("text-anchor", "middle")
      .attr("font-size", "16px")
      .attr("font-weight", "bold")
      .text(title);
  }, [data, dimensions, margin, xLabel, yLabel, title]);

  return (
    <svg
      id={title}
      xmlns="http://www.w3.org/2000/svg"
      ref={ref}
      style={{ width: "100%", height: "100%" }}
    ></svg>
  );
};

export default ScatterPlot;
