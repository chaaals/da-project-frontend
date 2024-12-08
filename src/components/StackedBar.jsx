import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

const StackedBarChart = ({
  data,
  keys,
  xLabel = "x",
  title = "Stacked Bar Chart",
}) => {
  const chartRef = useRef();
  const [containerSize, setContainerSize] = useState({
    width: 600,
    height: 400,
  });

  const updateChart = () => {
    const container = d3.select(chartRef.current);
    container.selectAll("*").remove();

    const { width, height } = containerSize;
    const margin = { top: 60, right: 30, bottom: 40, left: 50 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    if (innerWidth <= 0 || innerHeight <= 0 || !data || !keys) return;

    const svg = container
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const colorScale = d3.scaleOrdinal(d3.schemeCategory10).domain(keys);

    const xScale = d3
      .scaleBand()
      .domain(data.map((d) => d.category))
      .range([0, innerWidth])
      .padding(0.2);

    const yMax = d3.max(data, (d) =>
      keys.reduce((sum, key) => sum + (Number(d[key]) || 0), 0)
    );

    const yScale = d3
      .scaleLinear()
      .domain([0, yMax])
      .nice()
      .range([innerHeight, 0]);

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
      .attr("transform", `translate(0,${innerHeight})`)
      .call(d3.axisBottom(xScale));

    svg.append("g").call(d3.axisLeft(yScale));

    svg
      .append("text")
      .attr("x", innerWidth / 2)
      .attr("y", -35)
      .attr("text-anchor", "middle")
      .attr("font-size", "16px")
      .attr("font-weight", "bold")
      .text(title);

    svg
      .append("text")
      .attr("x", innerWidth / 2)
      .attr("y", height - 70)
      .attr("text-anchor", "middle")
      .style("font-size", "12px")
      .text(xLabel);

    const legend = svg
      .append("g")
      .attr("transform", `translate(0,${-margin.top / 2})`);

    keys.forEach((key, i) => {
      const legendItem = legend
        .append("g")
        .attr("transform", `translate(${i * 100}, 0)`);

      legendItem
        .append("rect")
        .attr("width", 20)
        .attr("height", 20)
        .attr("fill", colorScale(key));

      legendItem
        .append("text")
        .attr("x", 30)
        .attr("y", 15)
        .attr("alignment-baseline", "middle")
        .style("font-size", "10px")
        .text(key);
    });
  };

  useEffect(() => {
    updateChart();
  }, [data, keys, containerSize]);

  useEffect(() => {
    const handleResize = () => {
      const { width, height } = chartRef.current.getBoundingClientRect();
      setContainerSize({ width, height });
    };

    handleResize(); // Set initial size
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <svg
      id={title}
      xmlns="http://www.w3.org/2000/svg"
      ref={chartRef}
      style={{ width: "100%", height: "100%", position: "relative" }}
    ></svg>
  );
};

export default StackedBarChart;
