import { useEffect, useState } from "react";
import BubbleChart from "../components/BubbleChart";
import FunnelChart from "../components/FunnelChart";
import PieChart from "../components/PieChart";
import ScatterPlot from "../components/ScatterPlot";
import StackedBarChart from "../components/StackedBar";

export const chartEnums = {
  scatter: "SCATTER_PLOT",
  pie: "PIE_CHART",
  bubble: "BUBBLE_CHART",
  funnel: "FUNNEL_CHART",
  stackedbar: "STACKED_BAR_CHART",
};

const aggregateStackedBarData = (cat, col1, col2) => {
  const { rows: catData } = cat;
  const { label: col1Label, rows: col1Data } = col1;
  const { label: col2Label, rows: col2Data } = col2;

  const data = catData.map((cat, idx) => ({
    category: cat,
    [col1Label]: col1Data[idx],
    [col2Label]: col2Data[idx],
  }));
  const keys = [col1Label, col2Label];

  return { data, keys };
};

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

const generateChart = (selectedChart, chartData, chartName) => {
  switch (selectedChart) {
    case chartEnums.scatter:
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
          title={chartName ?? title}
          data={data}
          xLabel={xLabel}
          yLabel={yLabel}
        />
      );
    }
    case chartEnums.pie:
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

      return <PieChart title={chartName ?? title} data={pieData} />;
    }
    case chartEnums.bubble:
    case "bubble": {
      const { title, x, y, r } = chartData;
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
          title={chartName ?? title}
          data={bubbleData}
          xLabel={xLabel}
          yLabel={yLabel}
          rLabel={rLabel}
        />
      );
    }
    case chartEnums.funnel:
    case "funnel": {
      const { title, data } = chartData;
      if (!data) return null;

      const [column] = data;
      const { rows } = column;

      const freqTable = generateFrequencyTable(rows);

      const funnelData = freqTable.map((data) => {
        const [label, value] = data;
        return { label, value };
      });

      return <FunnelChart title={chartName ?? title} data={funnelData} />;
    }
    case chartEnums.stackedbar:
    case "stackedbar": {
      const { title, category, col1, col2 } = chartData;
      if (!category || !col1 || !col2) return null;

      const [cat] = category;
      const [_col1] = col1;
      const [_col2] = col2;

      const { data, keys } = aggregateStackedBarData(cat, _col1, _col2);

      return (
        <StackedBarChart title={chartName ?? title} data={data} keys={keys} />
      );
    }
    default:
      return null;
  }
};

const useChart = ({ selectedChart = "", chartData = {} }) => {
  const [chart, setChart] = useState(null);

  const getLabels = (chartData) => {
    const { x, y, r, data, category, col1, col2 } = chartData;

    if ((x && y) || (x && y && r)) {
      const [{ label: xLabel }] = x;
      const [{ label: yLabel }] = y;
      const [{ label: rLabel }] = r ?? [{}];

      return [xLabel, yLabel, rLabel].filter((label) => label).join(",");
    }

    if (data) {
      const [{ label: dataLabel }] = data;
      return dataLabel;
    }

    if (category && col1 && col2) {
      console.log({ category });
      const [{ label: catLabel }] = category;
      const [{ label: col1Label }] = col1;
      const [{ label: col2Label }] = col2;

      return [catLabel, col1Label, col2Label].join(",");
    }
  };

  const getCharts = (charts) => {
    if (!charts) {
      return null;
    }

    return charts.map(({ id, chart_type, chartData, name, overview }) => {
      const chart = generateChart(chart_type, chartData, name);

      return {
        id,
        name,
        overview,
        chart,
      };
    });
  };

  useEffect(() => {
    if (selectedChart) {
      const _chart = generateChart(selectedChart, chartData);

      setChart(_chart);
    }
  }, [selectedChart, chartData]);

  return { chart, chartEnums, getCharts, getLabels };
};

export default useChart;
