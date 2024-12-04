import { useEffect, useState } from "react";
import BubbleChart from "../components/BubbleChart";
import FunnelChart from "../components/FunnelChart";
import PieChart from "../components/PieChart";
import ScatterPlot from "../components/ScatterPlot";

import { rules } from "../components/addReportComponents/rules";

const generateChart = (selectedChart, chartData) => {
  switch (selectedChart) {
    case "scatter": {
      const { x, y } = chartData;
      if (!x || !y) return null;

      const [xCol] = x;
      const [yCol] = y;

      const { label: xLabel, rows: xData } = xCol;
      const { label: yLabel, rows: yData } = yCol;

      const data = xData.map((x, idx) => ({ x, y: yData[idx] }));

      return <ScatterPlot data={data} xLabel={xLabel} yLabel={yLabel} />;
    }
    case "pie":
    case "bubble":
    case "funnel":
    default:
      return null;
  }
};

const useChart = ({ selectedChart, chartData }) => {
  const [chart, setChart] = useState(null);

  useEffect(() => {
    if (selectedChart) {
      const _chart = generateChart(selectedChart, chartData);

      setChart(_chart);
    }
  }, [selectedChart, chartData]);

  return { chart };
};

export default useChart;
