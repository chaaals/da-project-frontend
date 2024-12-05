import { useEffect, useRef } from "react";
import * as d3 from "d3";

const FunnelChart = ({
  data,
  width = 400,
  height = 500,
  title = "Funnel Chart",
}) => {
  const ref = useRef();

  useEffect(() => {
    const svg = d3
      .select(ref.current)
      .attr("width", width)
      .attr("height", height);

    svg.selectAll("*").remove();

    const titleHeight = 40;
    const chartHeight = height - titleHeight;

    const total = d3.sum(data, (d) => d.value);
    const funnelHeight = chartHeight / data.length;

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", titleHeight / 2)
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")
      .text(title)
      .style("font-size", "20px")
      .style("font-weight", "bold");

    data.forEach((d, i) => {
      const currentWidth = (d.value / total) * width;
      const nextWidth =
        i < data.length - 1 ? (data[i + 1].value / total) * width : 0;

      const topY = i * funnelHeight + titleHeight;
      const bottomY = (i + 1) * funnelHeight + titleHeight;

      const polygonPoints = [
        [width / 2 - currentWidth / 2, topY],
        [width / 2 + currentWidth / 2, topY],
        [width / 2 + nextWidth / 2, bottomY],
        [width / 2 - nextWidth / 2, bottomY],
      ];

      svg
        .append("polygon")
        .attr("points", polygonPoints.map((p) => p.join(",")).join(" "))
        .attr("fill", color(i))
        .attr("stroke", "black");

      svg
        .append("text")
        .attr("x", width / 2)
        .attr("y", topY + funnelHeight / 2)
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle")
        .text(d.label)
        .style("fill", "white")
        .style("font-size", "14px");
    });
  }, [data, width, height, title]);

  return <svg ref={ref}></svg>;
};

export default FunnelChart;
