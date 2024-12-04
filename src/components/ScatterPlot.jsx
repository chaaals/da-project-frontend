import { useEffect, useRef } from "react";
import * as d3 from "d3";

const ScatterPlot = ({
  data,
  xLabel = "x",
  yLabel = "y",
  width = 500,
  height = 400,
}) => {
  const ref = useRef();

  useEffect(() => {
    const svg = d3
      .select(ref.current)
      .attr("width", width)
      .attr("height", height);

    svg.selectAll(".x-axis").remove();
    svg.selectAll(".y-axis").remove();
    svg.selectAll(".x-label").remove();
    svg.selectAll(".y-label").remove();

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
      .attr("class", "x-axis")
      .attr("transform", `translate(0, ${height - 40})`)
      .call(d3.axisBottom(xScale));

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
  }, [data, width, height, xLabel, yLabel]);

  return <svg ref={ref}></svg>;
};

export default ScatterPlot;
