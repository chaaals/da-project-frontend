import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

const PieChart = ({ data, title = "Pie Chart" }) => {
  const ref = useRef();
  const [containerSize, setContainerSize] = useState({
    width: 300,
    height: 300,
  });

  // Dynamically calculate parent container size on every render
  useEffect(() => {
    const updateSize = () => {
      if (ref.current && ref.current.parentElement) {
        const { width, height } =
          ref.current.parentElement.getBoundingClientRect();
        setContainerSize({
          width: Math.max(width, 200), // Minimum width of 200px
          height: Math.max(height, 200), // Minimum height of 200px
        });
      }
    };

    updateSize(); // Initial size calculation

    // Attach resize event listener for window resize
    window.addEventListener("resize", updateSize);

    return () => window.removeEventListener("resize", updateSize); // Cleanup
  }, []);

  useEffect(() => {
    const { width, height } = containerSize;
    const radius = Math.min(width, height) / 2 - 30; // Padding adjustment

    const svg = d3.select(ref.current);
    svg.selectAll("*").remove(); // Clear previous drawings

    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", 20)
      .attr("text-anchor", "middle")
      .attr("font-size", "16px")
      .attr("font-weight", "bold")
      .text(title);

    const chartGroup = svg
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2 + 20})`);

    const pie = d3.pie().value((d) => d.value);
    const arc = d3.arc().innerRadius(0).outerRadius(radius);
    const labelArc = d3
      .arc()
      .innerRadius(radius * 0.6)
      .outerRadius(radius * 0.6);

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    chartGroup
      .selectAll("path")
      .data(pie(data))
      .join("path")
      .attr("d", arc)
      .attr("fill", (d, i) => color(i));

    chartGroup
      .selectAll("text")
      .data(pie(data))
      .join("text")
      .attr("transform", (d) => `translate(${labelArc.centroid(d)})`)
      .attr("text-anchor", "middle")
      .attr("font-size", "12px")
      .text((d) => d.data.label);
  }, [data, containerSize, title]);

  return (
    <svg
      id={title}
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "100%" }}
      viewBox={`0 0 ${containerSize.width} ${containerSize.height}`}
      preserveAspectRatio="xMidYMid meet"
    ></svg>
  );
};

export default PieChart;
