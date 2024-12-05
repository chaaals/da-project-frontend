import { useEffect, useState } from "react";
import BubbleChart from "../components/BubbleChart";
import FunnelChart from "../components/FunnelChart";
import PieChart from "../components/PieChart";
import ScatterPlot from "../components/ScatterPlot";

import { rules } from "../components/addReportComponents/rules";

const generateFrequencyTable = (rows) => {
  const rowsMap = new Map();
  const table = [];

  for (const row of rows) {
    let _row = row;

    if (row === "true") {
      _row = "Yes";
    }

    if (row === "false") {
      _row = "No";
    }

    if (!rowsMap.has(_row)) {
      rowsMap.set(_row, 1);
      continue;
    }

    rowsMap.set(_row, rowsMap.get(_row) + 1);
  }

  let idx = 0;
  for (const [label, frequency] of rowsMap.entries()) {
    if (!table[idx]) {
      table.push([]);
    }

    table[idx].push(label);
    table[idx].push(frequency);

    idx++;
  }

  return table;
};

const generateChart = (selectedChart, chartData) => {
  switch (selectedChart) {
    case "scatter": {
      const { x, y, title } = chartData;
      if (!x || !y) return null;

      const [xCol] = x;
      const [yCol] = y;

      const { label: xLabel, rows: xData } = xCol;
      const { label: yLabel, rows: yData } = yCol;

      const data = xData.map((x, idx) => ({ x, y: yData[idx] }));

      return (
        <ScatterPlot
          title={title}
          data={data}
          xLabel={xLabel}
          yLabel={yLabel}
        />
      );
    }

    case "pie": {
      const { title, data } = chartData;
      if (!data) return null;

      const [column] = data;
      const { rows } = column;

      const freqTable = generateFrequencyTable(rows);

      const pieData = freqTable.map((data) => {
        const [label, value] = data;
        const percent = (parseFloat(value) / parseFloat(rows.length)) * 100;
        return { label: `${label}\n(${percent.toFixed(2)}%)`, value };
      });

      return <PieChart title={title} data={pieData} />;
    }
    case "bubble": {
      const { x, y, r, title } = chartData;
      if (!x || !y || !r) return null;

      const [xCol] = x;
      const [yCol] = y;
      const [rCol] = r;

      const { label: xLabel, rows: xData } = xCol;
      const { label: yLabel, rows: yData } = yCol;
      const { label: rLabel, rows: rData } = rCol;

      const bubbleData = xData.map((x, i) => ({ x, y: yData[i], r: rData[i] }));

      return (
        <BubbleChart
          title={title}
          data={bubbleData}
          xLabel={xLabel}
          yLabel={yLabel}
          rLabel={rLabel}
        />
      );
    }
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

  console.log({ chartData });
  return { chart };
};

export default useChart;
