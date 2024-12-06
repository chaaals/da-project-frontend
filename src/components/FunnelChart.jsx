import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

const FunnelChart = ({ data, title = "Funnel Chart" }) => {
  const ref = useRef();
  const [containerSize, setContainerSize] = useState({
    width: 400,
    height: 500,
  });

  useEffect(() => {
    const updateSize = () => {
      if (ref.current && ref.current.parentElement) {
        const { width, height } =
          ref.current.parentElement.getBoundingClientRect();
        setContainerSize({
          width: Math.max(width, 200), // Set minimum width
          height: Math.max(height, 300), // Set minimum height
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
      .select(ref.current)
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("preserveAspectRatio", "xMidYMid meet");

    svg.selectAll("*").remove(); // Clear previous SVG content

    const titleHeight = 40;
    const chartHeight = height - titleHeight;

    const total = d3.sum(data, (d) => d.value);
    const funnelHeight = chartHeight / data.length;

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    // Add title
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

      // Draw funnel section
      svg
        .append("polygon")
        .attr("points", polygonPoints.map((p) => p.join(",")).join(" "))
        .attr("fill", color(i))
        .attr("stroke", "black");

      // Add labels to sections
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
  }, [data, containerSize, title]);

  return <svg ref={ref} style={{ width: "100%", height: "100%" }}></svg>;
};

export default FunnelChart;
