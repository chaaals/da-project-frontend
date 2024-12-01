import { useEffect, useRef } from "react";
import * as d3 from "d3";

const BubbleChart = ({ data, width = 800, height = 600, padding = 20 }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    if (!data || data.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

    const sizeScale = d3
      .scaleLinear()
      .domain([d3.min(data, (d) => d.value), d3.max(data, (d) => d.value)])
      .range([10, 50]);

    const simulation = d3
      .forceSimulation(data)
      .force("charge", d3.forceManyBody().strength(5))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force(
        "collision",
        d3.forceCollide().radius((d) => sizeScale(d.value))
      )
      .on("tick", ticked);

    const bubbles = svg
      .selectAll(".bubble")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "bubble")
      .attr("r", (d) => sizeScale(d.value))
      .attr("fill", (d) => colorScale(d.category))
      .attr("fill-opacity", 0.7)
      .call(
        d3
          .drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended)
      );

    const labels = svg
      .selectAll(".label")
      .data(data)
      .enter()
      .append("text")
      .attr("class", "label")
      .attr("text-anchor", "middle")
      .attr("dy", ".3em")
      .style("font-size", "10px")
      .text((d) => d.label);

    function ticked() {
      bubbles.attr("cx", (d) => d.x).attr("cy", (d) => d.y);

      labels.attr("x", (d) => d.x).attr("y", (d) => d.y);
    }

    function dragstarted(event, d) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event, d) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event, d) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    bubbles
      .on("mouseover", function (event, d) {
        d3.select(this)
          .attr("stroke", "black")
          .attr("stroke-width", 2)
          .attr("fill-opacity", 1);

        svg
          .append("text")
          .attr("class", "tooltip")
          .attr("x", d.x)
          .attr("y", d.y - sizeScale(d.value) - 10)
          .attr("text-anchor", "middle")
          .style("font-size", "12px")
          .text(`${d.label}: ${d.value}`);
      })
      .on("mouseout", function () {
        d3.select(this).attr("stroke", null).attr("fill-opacity", 0.7);

        svg.select(".tooltip").remove();
      });
  }, [data, width, height, padding]);

  return (
    <svg ref={svgRef} width={width} height={height} className="bubble-chart" />
  );
};

export default BubbleChart;
