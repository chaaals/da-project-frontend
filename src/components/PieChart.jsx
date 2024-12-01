import { useEffect, useRef } from "react";
import * as d3 from "d3";

const PieChart = ({ data, width = 300, height = 300 }) => {
  const ref = useRef();

  useEffect(() => {
    const radius = Math.min(width, height) / 2;

    const svg = d3
      .select(ref.current)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const pie = d3.pie().value((d) => d.value);
    const arc = d3.arc().innerRadius(0).outerRadius(radius);

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    svg
      .selectAll("path")
      .data(pie(data))
      .join("path")
      .attr("d", arc)
      .attr("fill", (d, i) => color(i));
  }, [data, width, height]);

  return <svg ref={ref}></svg>;
};

export default PieChart;
