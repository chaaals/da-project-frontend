import { useEffect, useRef } from "react";
import * as d3 from "d3";

const ScatterPlot = ({ data, width = 500, height = 400 }) => {
  const ref = useRef();

  useEffect(() => {
    const svg = d3
      .select(ref.current)
      .attr("width", width)
      .attr("height", height);

    const xScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.x)])
      .range([40, width - 40]);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.y)])
      .range([height - 40, 40]);

    svg
      .selectAll("circle")
      .data(data)
      .join("circle")
      .attr("cx", (d) => xScale(d.x))
      .attr("cy", (d) => yScale(d.y))
      .attr("r", 5)
      .attr("fill", "teal");

    svg
      .append("g")
      .attr("transform", `translate(0, ${height - 40})`)
      .call(d3.axisBottom(xScale));

    svg
      .append("g")
      .attr("transform", `translate(40, 0)`)
      .call(d3.axisLeft(yScale));
  }, [data, width, height]);

  return <svg ref={ref}></svg>;
};

export default ScatterPlot;
