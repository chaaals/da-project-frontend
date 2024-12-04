import { useEffect, useRef } from "react";
import * as d3 from "d3";

const PieChart = ({ data, width = 300, height = 300, title = "Pie Chart" }) => {
  const ref = useRef();

  useEffect(() => {
    const radius = Math.min(width, height) / 2;

    d3.select(ref.current).selectAll("*").remove();

    const svg = d3
      .select(ref.current)
      .attr("width", width)
      .attr("height", height + 30);

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
      .attr("transform", `translate(${width / 2}, ${height / 2 + 30})`);

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
  }, [data, width, height, title]);

  return <svg ref={ref}></svg>;
};

export default PieChart;
